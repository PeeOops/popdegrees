import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const Movies = () => {

    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [page, setPages] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresURL, moviesURL] = await Promise.all([
                    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        return res.json();
                    }),
                    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        return res.json();
                    }),
                ])
                setGenres(genresURL.genres);
                setMovies(moviesURL.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }

        }

        fetchData();
    })

    return(
        <div>
            <Navigation />
            <div className="flex montserrat p-8">
                {/* Filter Side */}

                <div className="w-1/4 bg-red-950 text-white p-4 rounded-md">
                    <h1 className="border-b-2 pb-2 font-bold">Filter by</h1>
                    <p className="mt-4 font-bold">Genres</p>
                    <ul className="space-y-2 space-x-2">
                        {                
                            genres.map((genre) => <li className="bg-white text-red-950 p-2 rounded-md cursor-pointer hover:bg-yellow-300 inline-flex">{genre.name}</li>)
                        }
                    </ul>

                    <p className="mt-4 font-bold">Release Year</p>
                    <input className="w-full p-2 text-red-950 rounded-md mt-2" placeholder="Ex: 2020" type="number" id="year" name="year" min="1900" max={new Date().getFullYear()} />



                </div>

                {/* Movies Content Side */}
                

                <div className="w-3/4 bg-white">
                    <div className="flex flex-wrap justify-center items-center">
                        {
                            movies.slice(0,21).map((movie) => (
                                <Link to={`/movies/${movie.id}`} className="m-0 p-0 hover:scale-110 transition-transform duration-300 ease-in-out inline-flex mb-2 mr-2 ml-2 w-1/6"><img  key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-12 sm:w-24 md:w-32 lg:w-40 cursor-pointer " /></Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Movies;