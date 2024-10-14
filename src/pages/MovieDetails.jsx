import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import User from '../assets/user.svg';


const API_KEY = 'cbfc56177fc1d8965e8f21499c9b3ff0';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [casts, setCasts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isNavChange, SetIsNavChange] = useState("cast");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const MOVIE_DETAILS_URL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
            try {
                const response = await fetch(MOVIE_DETAILS_URL);
                if(!response.ok){
                    throw new Error('Fetch data failed');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        const fetchCasts = async () => {
            const CASTS_URL = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
            try {
                const response = await fetch(CASTS_URL);
                if(!response.ok){
                    throw new Error('Fetch data failed');
                }
                const data = await response.json();
                setCasts(data.cast);
                console.log(data)
            } catch (error) {
                setError(error.message);
            }
        }

        fetchMovieDetails();
        fetchCasts();
    },[id])

    const handleClickNavChange = (id) => {
        if(id === "cast"){
            SetIsNavChange("cast");
        }else if(id === "media"){
            SetIsNavChange("media");
        }else if(id === "reviews"){
            SetIsNavChange("reviews");
        }else if(id === "details"){
            SetIsNavChange("details");
        }
    }


    return( 
        <div className="flex flex-row">
            <div className="bg-white h-screen w-1/3 p-8 flex items-start flex-col">
                <i className="fa-solid fa-arrow-left mb-8 cursor-pointer" onClick={() => navigate(-1)} > Back</i>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.name} className="rounded-lg 2xl:w-96 lg:w-80 m-auto"/>
            </div>
            <div className="bg-red-950 h-screen w-2/3 p-8 text-white montserrat overflow-x-hidden">
                <div className="flex space-x-80 items-center flex-row">
                    <h1 className="2xl:text-4xl lg:text-2xl md:text-xl font-bold">{movie.title} ({movie.release_date?.split('-')[0]})</h1>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <hr className="border-t border-gray-300 my-2" />
                <div className="flex space-x-4 items-center flex-row">
                    <p>{movie.genres?.map((genre) => genre.name).join(', ')}</p>
                    <p className="p-0.5 border-white border-2 rounded-md font-bold text-sm">PG-13</p>
                </div>
                <p className="italic text-gray-400">{movie.tagline}</p>
                <p className="mt-2 lg:text-md 2xl:text-lg font-bold">Overview</p>
                <p className="2xl:text-md lg:text-sm line-clamp-3">{movie.overview}.</p>
                <div className="mt-2 flex flex-row">
                    <p className={`cursor-pointer lg:text-sm 2xl:text-md ${isNavChange === "cast" ? "border-b-4" : ""}`} onClick={() => handleClickNavChange("cast")}>Casts</p>
                    <p className={`cursor-pointer lg:text-sm 2xl:text-md ml-8 ${isNavChange === "media" ? "border-b-4" : ""}`}>Media</p>
                    <p className={`cursor-pointer lg:text-sm 2xl:text-md ml-8 ${isNavChange === "reviews" ? "border-b-4" : ""}`}>Reviews</p>
                    <p className={`cursor-pointer lg:text-sm 2xl:text-md ml-8 ${isNavChange === "details" ? "border-b-4" : ""}`} onClick={() => handleClickNavChange("details")}>Details</p>
                </div>
                {/* Casts */}
                <div className={isNavChange === "cast" ? "block" : "hidden"}>
                    <p className="mt-2 text-lg font-bold">Top Casts</p>
                    <div className="flex space-x-2 overflow-x-auto w-full">
                    {
                        casts.slice(0,20).map((cast) => (
                            <div key={cast.id} className="bg-white text-red-950 rounded-lg md:w-32 lg:w-32 2xl:w-40 flex-shrink-0 mb-2">
                                <img 
                                    src={cast.profile_path !== null ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : User} 
                                    alt={cast.name} 
                                    className="rounded-t-lg h-48" loading="lazy" 
                                />
                                <p className="montserrat font-bold m-1.5">{cast.name}</p>
                                <p className="m-1.5 text-sm">as {cast.character}</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
                {/* Details */}
                <div className={isNavChange === "details" ? "block" : "hidden"}>
                    <p className="mt-2 text-lg font-bold">Movie Details</p>
                    <div className="flex flex-row space-x-4 text-2xl mt-2 items-center">
                        <i className="fa-brands fa-x-twitter"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <div className="w-0.5 h-8 bg-white"></div>
                        <i class="fa-solid fa-link"></i>
                    </div>
                    <div className="flex flex-row space-x-2 items-center mt-8">
                        <p className="font-bold">Status: </p>
                        <p>{movie.status}</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <p className="font-bold">Original Language: </p>
                        <p>{movie.original_language?.toUpperCase()}</p>
                    </div>

                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <p className="font-bold">Budget: </p>
                        <p>${movie.budget?.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <p className="font-bold">Revenue: </p>
                        <p>${movie.revenue ? movie.revenue.toLocaleString() : '-'}</p>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default MovieDetails;