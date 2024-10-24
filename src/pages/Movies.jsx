import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const Movies = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { filter } = location.state || {};
    const { query } = location.state || { query: ""};
    const [genres, setGenres] = useState([]);
    const [chosenGenre, setChosenGenre] = useState([]);
    const [inputYear, setInputYear] = useState("");
    const [movieLists, setMovieLists] = useState("");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Using useMemo to store Fetch URLS
    const movieURL = useMemo(() => {
        // Set base URL
        let moviesURL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&language=en-US`;

        // Filter by Genre
        if(chosenGenre.length > 0){
            const onChosenGenre = chosenGenre.join(', ');
            moviesURL += `&with_genres=${onChosenGenre}`;
        }

        // Filter by Release Year
        if(inputYear){
            moviesURL += `&primary_release_year=${inputYear}`;
        }

        // Filter by Search Query
        if(query){
            moviesURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query.input}&page=${page}`;
        }
        
        // Filter base on home view all section
        if (filter && filter.url === "popular"){
            // View popular Movies from Home Page
            moviesURL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
        } else if (filter && filter.url === "upcoming"){
            // View upcoming Movies from Home Page
            moviesURL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
        }
        
        // Filter based on Lists
        if(movieLists) {
            // Only movie lists filter applied
            if(movieLists === "Now Playing"){
                moviesURL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }else if(movieLists === "Popular"){
                moviesURL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }else if(movieLists === "Top Rated"){
                moviesURL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }else if(movieLists === "Upcoming"){
                moviesURL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }
        }

        return moviesURL;
    },[page, inputYear, chosenGenre, movieLists, filter, query])

    

    useEffect(() => {
        // queryParams search the URL for location.search examples "https://movies?page=2" = "?page=2"
        const queryParams = new URLSearchParams(location.search);
        // pageFromUrl output will be "2" or "1" as default page
        const pageFromUrl = parseInt(queryParams.get('page')) || 1;
        setPage(pageFromUrl);

        const fetchData = async (page) => {
            try {
                // Fetch Genres URL and Movies URL
                const [genresURL, discoverURL] = await Promise.all([
                    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        return res.json();
                    }),
                    fetch(movieURL).then(((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        return res.json();
                    }))
                ]);
                setGenres(genresURL.genres);
                setMovies(discoverURL.results);
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        }

        fetchData(pageFromUrl);
    },[location.search, chosenGenre, inputYear, movieLists, filter, page, query, movieURL])

    // Next Page Button
    const handleNextPageButton = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        navigate(`/movies?page=${nextPage}`); 
    }

    // Previous Page Button
    const handlePreviousPageButton = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        navigate(`/movies?page=${prevPage}`);
    }

    // Filter Genres
    const handleClickFilterGenres = (genre) => {
        // Set Chosen Genre with previous item parameter
        setChosenGenre((prev) => {
            // Conditional check
            // If previous item include from genre id
            if (prev.includes(genre)) {
                // Filter to deselect
                return prev.filter(id => id !== genre);
            } else {
                // Else if not included yet, append array
                return [...prev, genre];
            }
        })
    }

    // Clear Filter
    const handleClickClearFilters = () => {
        setChosenGenre([]);
        setPage(1);
        setInputYear("");
        setMovieLists("");
        navigate(`/movies`);
    }

    // Enter Release Year
    const handleClickReleaseYear = (event) => {
        // Declare "year" from input and make it integer
        const year = parseInt(event.target.value, 10);
        // Conditional check
        // if the key that is pressed is "Enter", remove whitespace with trim() , check also if input year is between 1900 to current year
        if (event.key === "Enter" && event.target.value.trim() && year > 1900 && year <= new Date().getFullYear()) {
            setInputYear(year);
            event.target.value = "";
        }
    }

    const handleClickMovieLists = (lists) => {
        setMovieLists(lists);
    }

    return(
        <div>
            <div className="flex montserrat pt-8 pl-8 pr-8">
                {/* Filter Side */}

                <div className="w-1/4 bg-red-950 text-white p-4 rounded-md">
                    <div className="flex flex-row justify-between items-center border-b-2 pb-2 font-bold">
                        <h1 className="">Filter by</h1>
                        <button className="hover:text-yellow-300" onClick={handleClickClearFilters}>Clear</button>
                    </div>
                    <div className="flex flex-col mt-4 border-b-2 pb-2">
                        <p className="font-bold">Filtered:</p>
                        <p><b>Genres:</b> {chosenGenre.length === 0 ? "None" : genres.filter(genre => chosenGenre.includes(genre.id)).map(genre => genre.name).join(", ")}</p>
                        <p><b>Released Year:</b> {inputYear === "" ? "None" : inputYear}</p>
                        <p><b>Lists:</b> {movieLists === "" ? "None" : movieLists}</p>

                    </div>

                    <p className="mt-4 font-bold">Genres</p>
                    <ul className="space-y-2 space-x-2">
                        {                
                            genres.map((genre) => <li key={genre.id} className={`${chosenGenre.includes(genre.id) ? "bg-yellow-300" : "bg-white"} text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300 inline-flex`} onClick={() => handleClickFilterGenres(genre.id)} >{genre.name}</li>)
                        }
                    </ul>

                    <p className="mt-4 font-bold">Release Year</p>
                    <input className="w-full p-2 text-red-950 rounded-md mt-2" placeholder="Ex: 2020" type="number" id="year" name="year" min="1900" onKeyDown={handleClickReleaseYear} max={new Date().getFullYear()} />
                    <p className="mt-4 font-bold">Lists</p>
                    <ul className="space-y-2 mt-2">
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickMovieLists("Now Playing")}>Now Playing</li>
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickMovieLists("Popular")}>Popular</li>
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickMovieLists("Top Rated")}>Top Rated</li>
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickMovieLists("Upcoming")}>Upcoming</li>
                    </ul>




                </div>

                {/* Movies Content Side */}
                

                <div className="w-3/4 bg-white">
                    <div className="flex flex-wrap justify-center items-center">
                        {
                        loading ? <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-48 lg:my-96"></div> : movies.length !== 0 ? (
                            movies.slice(0,21).map((movie) => (
                                <Link key={movie.id} to={`/movies/${movie.id}`} className="m-0 p-0 hover:scale-110 transition-transform duration-300 ease-in-out inline-flex mb-2 mr-2 ml-2 w-1/6">
                                    {
                                        movie.poster_path !== null ?
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-12 sm:w-24 md:w-32 lg:w-40 cursor-pointer " /> :
                                        <div className="flex justify-center items-center bg-gray-300 m-auto lg:w-40 lg:h-[17.5vw]"><p className="font-bold text-center text-gray-600">N/A</p></div>
                                    }
                                </Link>
                            ))) : <p className="lg:my-96 font-bold lg:text-3xl">No Movies Found</p>
                        }
                        
                    </div>
                    
                    <div className={`flex justify-between ml-6 ${query ? "hidden" : "block"}`}>
                        <button className={`bg-red-950 text-white p-2 rounded-md hover:text-yellow-300 ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={page === 1} onClick={handlePreviousPageButton}>Prev</button>
                        <button className="bg-red-950 text-white p-2 rounded-md cursor-pointer hover:text-yellow-300" onClick={handleNextPageButton}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Movies;