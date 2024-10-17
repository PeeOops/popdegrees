import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../Utils';



const API_KEY = 'cbfc56177fc1d8965e8f21499c9b3ff0';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [casts, setCasts] = useState([]);
    const [medias, setMedias] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentReview, setCurrentReview] = useState(0);
    // NB: Show Error
    const [error, setError] = useState('');
    // NB: Make loading for each fetch? if necessary
    const [loading, setLoading] = useState(true);
    const [isNavChange, SetIsNavChange] = useState("cast");

    useEffect(() => {

        // Fetch Movie Data
        const fetchData = async () => {
            try {
              const [movieData, castData, mediaData, reviewsData] = await Promise.all([
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                })
              ]);
              setMovie(movieData);
              setCasts(castData.cast);
              setMedias(mediaData.results);
              setReviews(reviewsData.results);
              console.log(reviews)
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
        };
        fetchData();
    },[id,currentReview])

    // Dynamic Nav Changes
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

    // Next Review Button
    const handleClickNextReview = () => {
        if(currentReview < reviews.length - 1){
            setCurrentReview(currentReview + 1);
        }
    }

    // Previous Review Button
    const handleClickPreviousReview = () => {
        if(currentReview > 0){
            setCurrentReview(currentReview - 1);
        }
    }


    return( 
        <div className="flex flex-row h-screen">
            {/* Movie Poster */}
            <div className="relative flex flex-col items-start bg-white w-1/3 p-8 z-10">
                <FontAwesomeIcon icon={faArrowLeft} size="1x" onClick={() => navigate(-1)} className="cursor-pointer " />
                {loading ? (
                    <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-48"></div>
                    ) : (
                    movie.poster_path !== null ? (
                    <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.name} 
                    className="rounded-lg m-auto w-[25vw] h-[40vw]" 
                    />
                    ) : (
                    <div className="flex justify-center items-center bg-gray-300 rounded-lg m-auto w-[25vw] h-[40vw]  "><p className="font-bold text-center text-gray-600">N/A</p></div>
                    )
                )}
            </div>
            {/* Movie Background */}
            <div style={{backgroundImage : `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`}} className="text-white overflow-x-hidden montserrat bg-cover bg-center bg-red-950 w-2/3 p-8 ">
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10">
                    {/* Movie Title */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-[1.6vw] font-bold">{movie.title} ({movie.release_date?.split('-')[0]})</h1>
                        {/* NB: Add Search Input */}
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="right-content text-[1.4vw]" />
                    </div>
                    <hr className="border-t border-gray-300 my-2" />
                    {/* Movie Genres & Certificates */}
                    <div className="flex space-x-4 items-center flex-row">
                        <p className="text-[1.1vw]">{movie.genres?.map((genre) => genre.name).join(', ')}</p>
                        {/* NB: Add Content Rating based on Movie ID */}
                        <p className="border-white border-2 rounded-md font-bold text-[0.9vw] p-0.5">PG-13</p>
                    </div>
                    {/* Movie Tagline */}
                    <p className="italic text-gray-400 text-[1.05vw]">{movie.tagline}</p>
                    {/* Movie Overview */}
                    <p className="text-[1.2vw] font-bold mt-1">Overview</p>
                    <p className="text-[1.1vw] line-clamp-3">{movie.overview}</p>
                    {/* Nav Links */}
                    <div className="flex flex-row mt-2">
                        <p className={`cursor-pointer text-[1.05vw] ${isNavChange === "cast" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("cast")}>Casts</p>
                        <p className={`cursor-pointer text-[1.05vw] ml-8 ${isNavChange === "media" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("media")}>Media</p>
                        <p className={`cursor-pointer text-[1.05vw] ml-8 ${isNavChange === "reviews" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("reviews")}>Reviews</p>
                        <p className={`cursor-pointer text-[1.05vw] ml-8 ${isNavChange === "details" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("details")}>Details</p>
                    </div>
                    {/* Casts */}
                        {
                            casts.length !== 0 ?
                            <div className={isNavChange === "cast"? "block" : "hidden"}>
                                <p className="text-[1.2vw] font-bold my-2">Top Casts</p>
                                <div className="flex space-x-2 overflow-x-auto w-full">
                                {
                                    casts.slice(0,20).map((cast) => (
                                        <div key={cast.id} className="flex-shrink-0 rounded-lg bg-white text-red-950 w-[8vw] h-[20vw] mb-1">
                                            
                                            {
                                            // Check for the data is still being fetch
                                            loading ? (
                                            <div className="loader animate-spin border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-[2vw] h-[2vw] m-auto 2xl:my-28 lg:my-18 md:my-14"></div>
                                            ) : (
                                            // Check is there image for the actors
                                            cast.profile_path !== null ? (
                                                <img 
                                                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} 
                                                alt={cast.name} 
                                                className="rounded-t-lg" 
                                                />
                                            ) : (
                                                <div className="flex justify-center items-center rounded-t-lg bg-gray-300 w-[8vw] h-[12vw] "><p className="font-bold text-center text-gray-600 text-[1vw]">N/A</p></div>
                                            )
                                            )}
                                            <p className="montserrat font-bold m-1.5 text-[1vw]">{cast.name}</p>
                                            {
                                                // Check is there any role for the actors
                                                cast.character ? 
                                                <p className="m-1.5 text-[0.9vw]">as {cast.character}</p> :
                                                ""
                                            }

                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                             :
                            <div className="flex w-full justify-center items-center">
                                <p className="my-36 text-[2vw] font-bold">There are no cast members for this movie.</p>
                            </div>
                            
                        }
                        
                    {/* Medias */}
                    <div className={isNavChange === "media" ? "block" : "hidden"}>
                        <p className="text-[1.2vw] font-bold my-2">Movie Medias</p>
                        <div className="flex flex-row space-x-2 overflow-x-auto mt-2">
                            {
                                // Check for the data is still being fetch
                                loading ?
                                <div className="loader animate-spin border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-[2vw] h-[2vw] m-auto my-28"></div> :
                                // Filter to show only Teaser and Trailer Movies
                                medias.filter(media => media.type === "Teaser" || media.type === "Trailer").length < 0 ? (
                                    medias.filter(media => media.type === "Teaser" || media.type === "Trailer").map((media) => ( 
                                        <iframe key={media.key} className="w-full h-[20vw] aspect-video lazyload mb-1" src={`https://www.youtube.com/embed/${media.key}`}frameborder="0" title={media.name} allowFullScreen></iframe>
                                    ))) :
                                    // Check if there is no trailer
                                    <div className="flex w-full justify-center items-center">
                                        <p className="my-36 text-[2vw] font-bold">There are no trailers for this movie yet.</p>
                                    </div>
                            }
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className={isNavChange === "reviews" ? "block" : "hidden"}>
                        <p className="mt-2 text-lg font-bold">Movie Reviews</p>
                        
                            

                        <div className="flex flex-row space-x-2 items-center lg:space-y-8">
                                <i class="fa-solid fa-arrow-left cursor-pointer" onClick={handleClickPreviousReview} disabled={currentReview === 0}></i>
                                <div className="bg-white text-red-950 rounded-md p-2 lg:w-full h-full border-yellow-300 border-4     ">
                                <p className="font-bold">{reviews[currentReview]?.author}</p>
                                <div className="flex flex-row justify-between items-center">
                                    <p><b>Ratings:</b> {reviews[currentReview]?.author_details.rating} / 10</p>
                                    <p><b>Reviewed on:</b> {formatDate(reviews[currentReview]?.created_at)}</p>
                                </div>
                                <p className="mt-8 lg:line-clamp-6 font-medium">{reviews[currentReview]?.content}</p>
                                
                                </div>
                                <i class="fa-solid fa-arrow-right cursor-pointer" onClick={handleClickNextReview} disabled={currentReview === reviews.length - 1}></i>
                                </div>

                            
                            <p className="mt-2 font-bold float-right">View More</p>

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
        </div>
    )
}

export default MovieDetails;