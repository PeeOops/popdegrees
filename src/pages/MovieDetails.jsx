import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isNavChange, SetIsNavChange] = useState("cast");

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
              const [movieData, castData, mediaData, reviewsData] = await Promise.all([
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json()),
                fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`).then(res => res.json()),
                fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`).then(res => res.json()),
                fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`).then(res => res.json())
              ]);
              setMovie(movieData);
              setCasts(castData.cast);
              setMedias(mediaData.results);
              setReviews(reviewsData.results);
              console.log(reviewsData.results)
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
        };
        fetchData();
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

    const handleClickNextReview = () => {
        if(currentReview < reviews.length - 1){
            setCurrentReview(currentReview + 1);
        }
    }

    const handleClickPreviousReview = () => {
        if(currentReview > 0){
            setCurrentReview(currentReview - 1);
        }
    }


    return( 
        <div className="flex flex-row h-screen">
            {/* Movie Poster */}
            <div className="bg-white w-1/3 p-8 flex items-start flex-col relative z-10">
                <i className="fa-solid fa-arrow-left mb-8 cursor-pointer" onClick={() => navigate(-1)} > Back</i>
                {loading ? (
                    <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-48"></div>
                    ) : (
                    movie.poster_path !== null ? (
                    <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.name} 
                    className="rounded-lg w-[25vw] m-auto" 
                    />
                    ) : (
                    <div className="bg-gray-300 w-[25vw] h-full flex justify-center items-center rounded-lg m-auto"><p className="font-bold text-center text-gray-600">N/A</p></div>
                    )
                )}
            </div>
            {/* Movie Background */}
            <div style={{backgroundImage : `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`}} className="bg-cover bg-center bg-red-950 w-2/3 p-8 text-white montserrat overflow-x-hidden">
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10">
                    {/* Movie Title */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-[2vw] font-bold">{movie.title} ({movie.release_date?.split('-')[0]})</h1>
                        <i className="fa-solid fa-magnifying-glass right-content text-[2vw]"></i>
                    </div>
                    <hr className="border-t border-gray-300 my-2" />
                    {/* Movie Genres & Certificates */}
                    <div className="flex space-x-4 items-center flex-row">
                        <p className="text-[1.2vw]">{movie.genres?.map((genre) => genre.name).join(', ')}</p>
                        <p className="p-0.5 border-white border-2 rounded-md font-bold text-sm">PG-13</p>
                    </div>
                    {/* Movie Tagline */}
                    <p className="italic text-gray-400 text-[1.1vw]">{movie.tagline}</p>
                    {/* Movie Overview */}
                    <p className="mt-1 text-[1.3vw] font-bold">Overview</p>
                    <p className="text-[1.2vw] line-clamp-2">{movie.overview}.</p>
                    {/* Nav Links */}
                    <div className="mt-2 flex flex-row">
                        <p className={`cursor-pointer text-[1.2vw] ${isNavChange === "cast" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("cast")}>Casts</p>
                        <p className={`cursor-pointer text-[1.2vw] ml-8 ${isNavChange === "media" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("media")}>Media</p>
                        <p className={`cursor-pointer text-[1.2vw] ml-8 ${isNavChange === "reviews" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("reviews")}>Reviews</p>
                        <p className={`cursor-pointer text-[1.2vw] ml-8 ${isNavChange === "details" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("details")}>Details</p>
                    </div>
                    {/* Casts */}
                    
                    <div className={isNavChange === "cast"? "block" : "hidden"}>
                        {
                            casts.length !== 0 ?
                            <p className="my-2 text-[1.3vw] font-bold">Top Casts</p> :
                            <p className="my-2 text-[1.5vw] font-bold">No Casts</p>
                        }
                        
                        <div className="flex space-x-2 overflow-x-auto w-full">
                        {
                            casts.slice(0,20).map((cast) => (
                                <div key={cast.id} className="bg-white text-red-950 rounded-lg w-[9vw] h-auto flex-shrink-0 mb-2">
                                    {loading ? (
                                    <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-[2vw] h-[2vw] animate-spin m-auto 2xl:my-28 lg:my-16 md:my-14"></div>
                                    ) : (
                                    cast.profile_path !== null ? (
                                        <img 
                                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} 
                                        alt={cast.name} 
                                        className="rounded-t-lg" 
                                        />
                                    ) : (
                                        <div className="bg-gray-300 w-[9vw] h-[13.5vw] flex justify-center items-center rounded-t-lg"><p className="font-bold text-center text-gray-600 text-[1.5vw]">N/A</p></div>
                                    )
                                    )}
                                    <p className="montserrat font-bold m-1.5 text-[1vw]">{cast.name}</p>
                                    <p className="m-1.5 text-[0.8vw]">as {cast.character}</p>
                                </div>
                                
                            ))
                        }
                        </div>
                    </div>

                    {/* Medias */}
                    <div className={isNavChange === "media" ? "block" : "hidden"}>
                        <p className="my-2 text-lg font-bold">Movie Medias</p>
                        <div className="flex flex-row space-x-4 overflow-x-auto mt-2">
                            
                            {
                                
                                loading ?
                                <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-28 lg:my-16"></div> :
                                medias.filter(media => media.type === "Teaser" || media.type === "Trailer").length > 0 ? (
                                    medias.filter(media => media.type === "Teaser" || media.type === "Trailer").map((media) => ( 
                                        <iframe className="w-full 2xl:h-96 lg:h-64 aspect-video lazyload mb-2" src={`https://www.youtube.com/embed/${media.key}`}frameborder="0" title={media.name} allowFullScreen></iframe>
                                    ))) :
                                    <p className="my-2 text-lg">There is no trailer at the moment.</p>
                            }
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className={isNavChange === "reviews" ? "block" : "hidden"}>
                        <p className="mt-2 text-lg font-bold">Movie Reviews</p>
                        
                            

                                <div className="flex flex-row space-x-2 items-center lg:space-y-8">
                                <i class="fa-solid fa-arrow-left cursor-pointer" onClick={handleClickPreviousReview} disabled={currentReview === 0}></i>
                                <div className="bg-white text-red-950 rounded-md p-2 lg:w-full h-full border-yellow-300 border-4     ">
                                <p className="font-bold">{reviews[currentReview].author}</p>
                                <div className="flex flex-row justify-between items-center">
                                    <p><b>Ratings:</b> {reviews[currentReview].author_details.rating} / 10</p>
                                    <p><b>Reviewed on:</b> {formatDate(reviews[currentReview].created_at)}</p>
                                </div>
                                <p className="mt-8 lg:line-clamp-6 font-medium">{reviews[currentReview].content}</p>
                                
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