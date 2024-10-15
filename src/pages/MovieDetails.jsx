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
    const [medias, setMedias] = useState([]);
    const [reviews, setReviews] = useState([]);
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
              setReviews();
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
                    className="rounded-lg 2xl:w-96 lg:w-80 m-auto" 
                    />
                    ) : (
                    <div className="bg-gray-300 2xl:w-96 lg:w-80 h-full flex justify-center items-center rounded-lg m-auto"><p className="font-bold text-center text-gray-600">N/A</p></div>
                    )
                )}
            </div>
            {/* Movie Background */}
            <div style={{backgroundImage : `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`}} className="bg-cover bg-center bg-red-950 w-2/3 p-8 text-white montserrat overflow-x-hidden">
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10">
                    {/* Movie Title */}
                    <div className="flex justify-between items-center">
                        <h1 className="2xl:text-3xl lg:text-xl md:text-xl font-bold">{movie.title} ({movie.release_date?.split('-')[0]})</h1>
                        <i className="fa-solid fa-magnifying-glass right-content"></i>
                    </div>
                    <hr className="border-t border-gray-300 my-2" />
                    {/* Movie Genres & Certificates */}
                    <div className="flex space-x-4 items-center flex-row">
                        <p className="2xl:text-md lg:text-sm">{movie.genres?.map((genre) => genre.name).join(', ')}</p>
                        <p className="p-0.5 border-white border-2 rounded-md font-bold text-sm">PG-13</p>
                    </div>
                    {/* Movie Tagline */}
                    <p className="italic text-gray-400 lg:text-sm">{movie.tagline}</p>
                    {/* Movie Overview */}
                    <p className="mt-1 2xl:text-lg lg:text-md font-bold">Overview</p>
                    <p className="2xl:text-md lg:text-sm line-clamp-2">{movie.overview}.</p>
                    {/* Nav Links */}
                    <div className="mt-2 flex flex-row">
                        <p className={`cursor-pointer 2xl:text-md lg:text-sm ${isNavChange === "cast" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("cast")}>Casts</p>
                        <p className={`cursor-pointer 2xl:text-md lg:text-sm ml-8 ${isNavChange === "media" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("media")}>Media</p>
                        <p className={`cursor-pointer 2xl:text-md lg:text-sm ml-8 ${isNavChange === "reviews" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("reviews")}>Reviews</p>
                        <p className={`cursor-pointer 2xl:text-md lg:text-sm ml-8 ${isNavChange === "details" ? "border-b-2" : ""}`} onClick={() => handleClickNavChange("details")}>Details</p>
                    </div>
                    {/* Casts */}
                    
                    <div className={isNavChange === "cast"? "block" : "hidden"}>
                        {
                            casts.length !== 0 ?
                            <p className="my-2 text-lg font-bold">Top Casts</p> :
                            <p className="my-2 text-lg font-bold">No Casts</p>
                        }
                        
                        <div className="flex space-x-2 overflow-x-auto w-full">
                        {
                            casts.slice(0,20).map((cast) => (
                                <div key={cast.id} className="bg-white text-red-950 rounded-lg 2xl:w-48 lg:w-32 h-auto md:w-32 flex-shrink-0 mb-2">
                                    {loading ? (
                                    <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-28 lg:my-16"></div>
                                    ) : (
                                    cast.profile_path !== null ? (
                                        <img 
                                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} 
                                        alt={cast.name} 
                                        className="rounded-t-lg" 
                                        />
                                    ) : (
                                        <div className="bg-gray-300 2xl:w-48 2xl:h-70 lg:w-32 lg:h-48 flex justify-center items-center rounded-t-lg"><p className="font-bold text-center text-gray-600">N/A</p></div>
                                    )
                                    )}
                                    <p className="montserrat font-bold m-1.5 lg:text-sm">{cast.name}</p>
                                    <p className="m-1.5 lg:text-xs">as {cast.character}</p>
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
                            <i class="fa-solid fa-arrow-left"></i>
                            <div className="bg-white text-red-950 rounded-md p-2 lg:w-full h-full border-yellow-300 border-4     ">
                                <p className="font-bold">Cinema Serf</p>
                                <div className="flex flex-row justify-between items-center">
                                    <p><b>Ratings:</b> 5 / 10</p>
                                    <p><b>Date:</b> 15th October 2024</p>
                                </div>
                                <p className="mt-8 lg:line-clamp-6 font-medium">I really quite enjoyed the first of these (2015) but I struggled a bit to stay engaged with the one. "Riley" is still happily coasting through family life until one day, she embarks on the yellow brick road that is puberty. Towit, her control gallery is no longer the purview of just her lifelong guides like "Fear", "Joy" and "Anger" - now she has also to deal with the likes of disgust, envy, boredom and worst of all - anxiety. It's maybe the latter that the film should be called as we now embark on quite a humourless swipe at the culture of validation that young people must navigate. It's all about being popular. Being liked. Being the best - in the ice hockey team. Old loyalties go under the bus in favour of new aspirations and yes, much of it does ring quite true as an evaluation of the fickleness in all of us. Thing is, though, there's just too much inevitability about what comes next and there's way too much incessant dialogue. "Anger" has some fun along the way, and there is the odd comedy one-liner from the laconic "Ennui" but it just didn't resonate with me at all. The animation is standard Pixar fayre that does the job colourfully but unremarkably, and by the conclusion I was hoping there was an off button on that great big console. Yep - I'm probably too old to really appreciate this the way the kids can, but the trick for these studios has to be to engage the adults at the same time as the weans, else out come the mobile phones as our own version of ennui sets in. It's fine, but forgettable, sorry.</p>
                                
                            </div>
                            <i class="fa-solid fa-arrow-right"></i>
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