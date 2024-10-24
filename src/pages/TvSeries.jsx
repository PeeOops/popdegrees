import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const TvSeries = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [tvSeries, setTvSeries] = useState([]);
    const { query } = location.state || { query: ""};
    const { filter } = location.state || { filter: "" };
    const [genres, setGenres] = useState([]);
    const [inputYear, setInputYear] = useState("");
    const [seriesLists, setSeriesLists] = useState("");
    const [chosenGenre, setChosenGenre] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const seriesURL = useMemo(() => {
        // Base Series URL
        let url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}&language=en-US`;

        // Filter by Genre
        if(chosenGenre.length > 0){
            const onChosenGenre = chosenGenre.join(',');
            url += `&with_genres=${onChosenGenre}`;
        }
        // Filter by Release Year
        if(inputYear){
            url += `&first_air_date_year=${inputYear}`;
        }

        // Filter by Search Query
        if(query){
            url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query.input}&page=${page}`;
        }

        if(filter && filter.url === "top_rated"){
            url = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
        }

        // Filter based on Lists
        if(seriesLists) {
            // Only movie lists filter applied
            if(seriesLists === "Airing Today"){
                url = `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }else if(seriesLists === "On The Air"){
                url = `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }else if(seriesLists === "Popular"){
                url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }else if(seriesLists === "Top Rated"){
                url = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
                setChosenGenre("");
                setInputYear("");
            }
        }

        return url;
    },[page, chosenGenre, inputYear, seriesLists, query])


    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(queryParams.get('page')) || 1;
        setPage(pageFromUrl);

        const fetchData = async (page) => {
            try {
                const [genresURL, discoverURL] = await Promise.all([
                    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        return res.json();
                    }),
                    fetch(seriesURL).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        return res.json();
                    }),
                ])
                setGenres(genresURL.genres);
                setTvSeries(discoverURL.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        }

        fetchData(pageFromUrl);
    },[location.search, seriesURL, chosenGenre, inputYear, query])

    const handleNextPageButton = () => {
        const nextPage = page + 1;
        setPage(nextPage); 
        navigate(`/series?page=${nextPage}`); 
    }

    const handlePreviousPageButton = () => {
        const prevPage = page - 1;
        setPage(prevPage);
        navigate(`/series?page=${prevPage}`);
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

    // Filter Series Lists
    const handleClickSeriesLists = (lists) => {
        setSeriesLists(lists);
    }

    // Clear Filter
    const handleClickClearFilters = () => {
        setChosenGenre([]);
        setPage(1);
        setInputYear("");
        setSeriesLists("");
        navigate(`/series`);
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
                        <p><b>Lists:</b> {seriesLists === "" ? "None" : seriesLists}</p>

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
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickSeriesLists("Airing Today")}>Airing Today</li>
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickSeriesLists("On The Air")}>On The Air</li>
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickSeriesLists("Popular")}>Popular</li>
                        <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300" onClick={() => handleClickSeriesLists("Top Rated")}>Top Rated</li>
                    </ul>




                </div>

                {/* Series Content Side */}
                

                <div className="w-3/4 bg-white">
                    <div className="flex flex-wrap justify-center items-center">
                    {
                        loading ? <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-48 lg:my-96"></div> :
                            tvSeries.slice(0,21).map((series) => (
                                <Link to={`/series/${series.id}`} className="m-0 p-0 hover:scale-110 transition-transform duration-300 ease-in-out inline-flex mb-2 mr-2 ml-2 w-1/6">
                                    {
                                        series.poster_path !== null ?
                                        <img  key={series.id} src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={series.title} className="w-12 sm:w-24 md:w-32 lg:w-40 cursor-pointer " /> :
                                        <div className="flex justify-center items-center bg-gray-300 m-auto lg:w-40 lg:h-[17.5vw]"><p className="font-bold text-center text-gray-600">N/A</p></div>
                                    }
                                </Link>
                            ))
                        }
                        
                    </div>
                    
                    <div className="flex justify-between ml-6">
                        <button className={`bg-red-950 text-white p-2 rounded-md hover:text-yellow-300 ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={page === 1} onClick={handlePreviousPageButton}>Prev</button>
                        <button className="bg-red-950 text-white p-2 rounded-md cursor-pointer hover:text-yellow-300" onClick={handleNextPageButton}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TvSeries;