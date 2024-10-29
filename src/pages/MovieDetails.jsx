import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHome} from '@fortawesome/free-solid-svg-icons';
import { formatRuntime, formatDate } from '../Utils';
import { faFacebook, faXTwitter, faInstagram, faImdb } from '@fortawesome/free-brands-svg-icons';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [casts, setCasts] = useState([]);
    const [medias, setMedias] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [externalId, setExternalId] = useState({});
    const [releaseDate, setReleaseDate] = useState([]);
    const [currentReview, setCurrentReview] = useState(0);
    const [certification, setCertification] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isNavChange, SetIsNavChange] = useState("cast");
    const [viewMore, setViewMore] = useState(false);

    useEffect(() => {

        // Fetch Movie Data
        const fetchData = async () => {
            try {
              const [movieDataURL, castDataURL, mediaDataURL, reviewsDataURL, externalURL, releaseDateURL, languageURL] = await Promise.all([
                // Fetch Movie Details
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                // Fetch Casts
                fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                // Fetch Medias
                fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                // Fetch Reviews
                fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                // Fetch Social Media Links
                fetch(`${BASE_URL}/movie/${id}/external_ids?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                // Fetch Release Dates
                fetch(`${BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                // Fetch Language
                fetch(`${BASE_URL}/configuration/languages?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                }),
                
              ]);
              setMovie(movieDataURL);
              setCasts(castDataURL.cast);
              setMedias(mediaDataURL.results);
              setReviews(reviewsDataURL.results);
              setExternalId(externalURL);
              setReleaseDate(releaseDateURL.results
                .filter(item => item.iso_3166_1 === "ID")
                .flatMap(item => item.release_dates.map(date => date.release_date))
                .pop());
              setCertification(releaseDateURL.results.filter(item => item.iso_3166_1 === "US").flatMap(item => item.release_dates.map(cert => cert.certification)).pop());
              setLanguages(languageURL);
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
        SetIsNavChange(id);
    }

    // View More Reviews Button
    const handleClickViewMore = () => {
        setViewMore((prev) => !prev);
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
                {/* Back Button */}
                <FontAwesomeIcon icon={faArrowLeft} size="1x" onClick={() => navigate(-1)} className="cursor-pointer " />
                {/* Movie Poster */}
                {
                    loading ? 
                    (
                        <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-48"></div>
                    ) : 
                    (
                        movie.poster_path !== null ? 
                        (
                            <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.name} 
                            className="rounded-lg m-auto w-[25vw] h-[40vw]" 
                            />
                        ) : 
                        (
                            <div className="flex justify-center items-center bg-gray-300 rounded-lg m-auto w-[25vw] h-[40vw]  "><p className="font-bold text-center text-gray-600">N/A</p></div>
                        )
                    )
                }
            </div>

            {/* Movie Background */}
            <div style={{backgroundImage : `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`}} className="text-white overflow-x-hidden montserrat bg-cover bg-center bg-red-950 w-2/3 p-8 ">
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10">
                    <div className={`${viewMore === true ? "hidden" : "block"}`}>
                        {/* Movie Title */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-[1.6vw] font-bold">{movie.title} ({movie.release_date?.split('-')[0]})</h1>
                            {/* Show Error Messages */}
                            {error && <p className="text-red-600">{error}</p>}
                        </div>
                        <hr className="border-t border-gray-300 my-2" />
                        {/* Movie Genres, Certificates and User Score */}
                        <div className="flex space-x-4 items-center flex-row">
                            <p className="text-[1.1vw]">{movie.genres?.map((genre) => genre.name).join(', ')}</p>
                            <p className="border-white border-2 font-bold text-[0.9vw] p-0.5 pr-1 pl-1">{certification ? certification : "NR"}</p>
                            <p className="text-[1.1vw]">User Score: {movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : "0"} / 10</p>
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
                    </div>
                    {/* Casts */}
                        <div className={isNavChange === "cast"? "block" : "hidden"}>
                            {
                                casts.length !== 0 ?
                                    <>
                                    <p className="text-[1.2vw] font-bold my-2">Top Casts</p>
                                    <div className="flex space-x-2 overflow-x-auto w-full">
                                    {
                                        casts.slice(0,20).map((cast) => (
                                            <div key={cast.id} className="flex-shrink-0 rounded-lg bg-white text-red-950 w-[8vw] h-[20vw] mb-1">
                                                {
                                                    // Check for the data is still being fetch
                                                    loading ? 
                                                (
                                                    <div className="loader animate-spin border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-[2vw] h-[2vw] m-auto 2xl:my-28 lg:my-18 md:my-14"></div>
                                                ) : 
                                                (
                                                    // Check is there image for the actors
                                                    cast.profile_path !== null ? 
                                                (
                                                    <img 
                                                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} 
                                                    alt={cast.name} 
                                                    className="rounded-t-lg" 
                                                    />
                                                ) : 
                                                (
                                                    <div className="flex justify-center items-center rounded-t-lg bg-gray-300 w-[8vw] h-[12vw] "><p className="font-bold text-center text-gray-600 text-[1vw]">N/A</p></div>
                                                )
                                                )}
                                                <p className="montserrat font-bold m-1.5 text-[1vw]">{cast.name}</p>
                                                {
                                                    // Check is there any role for the actors
                                                    cast.character ? 
                                                    <p className="m-1.5 text-[0.9vw] line-clamp-3">as {cast.character}</p> :
                                                    ""
                                                }

                                            </div>
                                        ))
                                    }
                                    </div>
                                </>
                            :
                            <div className="flex w-full justify-center items-center">
                                <p className="my-36 text-[2vw] font-bold">There are no cast members for this movie.</p>
                            </div>
                        }
                        </div>
                        
                    {/* Medias */}
                    <div className={isNavChange === "media" ? "block" : "hidden"}>
                        <p className="text-[1.2vw] font-bold my-2">{medias.filter(media => media.type === "Teaser" || media.type === "Trailer").length > 0 ? "Movies Media" : ""}</p>
                        <div className="flex flex-row space-x-2 overflow-x-auto mt-2">
                            {
                                // Check for the data is still being fetch
                                loading ?
                                <div className="loader animate-spin border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-[2vw] h-[2vw] m-auto my-28"></div> :
                                // Filter to show only Teaser and Trailer Movies
                                medias.filter(media => media.type === "Teaser" || media.type === "Trailer").length > 0 ? (medias.filter(media => media.type === "Teaser" || media.type === "Trailer").map((media) => ( 
                                        <iframe key={media.key} className="w-full lg:h-[20vw] 2xl:h-[23vw] aspect-video lazyload mb-1" src={`https://www.youtube.com/embed/${media.key}`}frameborder="0" title={media.name} allowFullScreen></iframe>
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
                        {
                            loading?
                            <div className="loader animate-spin border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-[2vw] h-[2vw] m-auto my-28"></div> : reviews.length !== 0 ? (
                            <>
                            <p className="text-[1.2vw] font-bold my-2">Movie Reviews</p>
                            <div className="flex flex-row items-center space-y-2">
                                <FontAwesomeIcon icon={faArrowLeft} onClick={handleClickPreviousReview} className={` mx-2 ${currentReview === 0 ? "cursor-not-allowed" : "cursor-pointer"}`} />
                                {/* NB: Check Height */}
                                <div className={`bg-red-950 text-white border-white border-2 rounded-md p-2 w-full ${viewMore === false ? "h-64" : "h-[37vw]"}`}>
                                    <p><b>Author:</b> {reviews[currentReview]?.author}</p>
                                    <div className="flex flex-row justify-between items-center">
                                        <p><b>Ratings:</b> {reviews[currentReview].author_details.rating !== null ? `${reviews[currentReview].author_details.rating} / 10` : "None"}</p>
                                        <p><b>Date:</b> {formatDate(reviews[currentReview]?.created_at)}</p>
                                    </div>
                                    <p className={`mt-8 ${viewMore === false ? "line-clamp-6" : "line-clamp-20 text-sm"} font-medium`}>{reviews[currentReview]?.content}</p>
                                </div>
                                <FontAwesomeIcon icon={faArrowRight} onClick={handleClickNextReview} className={` mx-2 ${currentReview === reviews.length - 1 ? "cursor-not-allowed" : "cursor-pointer"}`} />
                                </div> 
                                </>
                                ) :
                                <div className="flex w-full justify-center items-center">
                                        <p className="my-36 text-[2vw] font-bold">There are no reviews for this movie yet.</p>
                            </div>

                            }
                            {/* Expand Reviews Button */}
                            {
                                reviews.length !== 0 ? <p className="cursor-pointer mt-2 font-bold float-right" onClick={handleClickViewMore}>{viewMore === false ? "View More" : "View Less"}</p> : ""
                            }
                            
                    </div>

                    {/* Details */}
                    <div className={isNavChange === "details" ? "block" : "hidden"}>
                        <p className="text-[1.2vw] font-bold my-2">Movie Details</p>
                        <div className="flex flex-row items-center space-x-4 text-[1.8vw] mt-2 ">
                            {/* Social Media Links */}
                            {
                                externalId.twitter_id ? 
                                <a href={`https://twitter.com/intent/user?user_id=${externalId.twitter_id}`} target="_blank">
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </a> : ""
                            }
                            {
                                externalId.instagram_id ?
                                <a href={`https://www.instagram.com/${externalId.instagram_id}/`} target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a> : ""
                            }
                            {
                                externalId.facebook_id ?
                                <a href={`https://www.facebook.com/${externalId.facebook_id}`} target="_blank">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a> : ""
                            }
                            {
                                externalId.instagram_id || externalId.facebook_id || externalId.twitter_id ?
                                <div className="w-0.5 h-[2vw] bg-white"></div> : ""
                            }
                            
                            {
                                externalId.imdb_id ? 
                                <a href={`https://www.imdb.com/title/${externalId.imdb_id}/`} target="_blank">
                                <FontAwesomeIcon icon={faImdb} />
                                </a> : ""
                            }
                            
                            { 
                                movie.homepage ?
                                <a href={movie.homepage}target="_blank">
                                    <FontAwesomeIcon icon={faHome} />
                                </a> : ""
                            }   
                        </div>
                        <div className="flex flex-row space-x-2 items-center mt-2 text-[1.2vw]">
                            <p className="font-bold">Status: </p>
                            <p>{movie.status}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center mt-2 text-[1.2vw]">
                            <p className="font-bold">Release Date: </p>
                            <p>{releaseDate !== undefined ? formatDate(releaseDate) : "Not available in this country / Not Confirmed Yet"}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center mt-2 text-[1.2vw]">
                            <p className="font-bold">Total Runtime: </p>
                            <p>{formatRuntime(movie.runtime)}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center mt-2 text-[1.2vw]">
                            <p className="font-bold">Original Language: </p>
                            <p>{languages.some(language => language.iso_639_1.toLowerCase() === movie.original_language.toLowerCase())
                            ? languages.filter(language => language.iso_639_1.toLowerCase() === movie.original_language.toLowerCase()).map(language => language.english_name)
                            : ""}</p>
                        </div>

                        <div className="flex flex-row space-x-2 items-center mt-2 text-[1.2vw]">
                            <p className="font-bold">Budget: </p>
                            <p>{movie.budget ? `$${movie.budget.toLocaleString()}` : "-"}</p>
                        </div>
                        <div className="flex flex-row space-x-2 items-center mt-2 text-[1.2vw]">
                            <p className="font-bold">Revenue: </p>
                            <p>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : "-"}</p>
                        </div>
                        <div className="flex flex-col mt-2 text-[1.2vw]">
                            <p><b>Production Companies:</b> {movie.production_companies?.map((company) => company.name).join(', ')}</p>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    )
}

export default MovieDetails;