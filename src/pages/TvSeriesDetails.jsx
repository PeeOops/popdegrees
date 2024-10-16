import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_KEY = 'cbfc56177fc1d8965e8f21499c9b3ff0';
const BASE_URL = 'https://api.themoviedb.org/3';

const TvSeriesDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [series, setSeries] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const [tvDetailsURL] = await Promise.all([fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`).then((res) => {
                    if(!res.ok){
                        throw new Error("Fetch data failed");
                    }
                    return res.json();
                })
                ]);
                setSeries(tvDetailsURL)
                console.log(series)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    },[id])

    return(
        <div className="flex flex-row h-screen">
            {/* Movie Poster */}
            <div className="bg-white w-1/3 p-8 flex items-start flex-col relative z-10">
                <i className="fa-solid fa-arrow-left mb-8 cursor-pointer" onClick={() => navigate(-1)} > Back</i>
                {loading ? (
                    <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin m-auto 2xl:my-48"></div>
                    ) : (
                    series.poster_path !== null ? (
                    <img 
                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} 
                    alt={series.name} 
                    className="rounded-lg w-[25vw] m-auto" 
                    />
                    ) : (
                    <div className="bg-gray-300 w-[25vw] h-full flex justify-center items-center rounded-lg m-auto"><p className="font-bold text-center text-gray-600">N/A</p></div>
                    )
                )}
            </div>
            {/* Movie Background */}
            <div style={{backgroundImage : `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${series.backdrop_path})`}} className="bg-cover bg-center bg-red-950 w-2/3 p-8 text-white montserrat overflow-x-hidden">
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10">
                    {/* Movie Title */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-[2vw] font-bold">{series.name} ({series.first_air_date?.split('-')[0]})</h1>
                        <i className="fa-solid fa-magnifying-glass right-content text-[2vw]"></i>
                    </div>
                    <hr className="border-t border-gray-300 my-2" />
                    {/* Movie Genres & Certificates */}
                    <div className="flex space-x-4 items-center flex-row">
                        <p className="text-[1.2vw]">{series.genres?.map((genre) => genre.name).join(', ')}</p>
                        <p className="p-0.5 border-white border-2 rounded-md font-bold text-sm">PG-13</p>
                    </div>
                    {/* Movie Tagline */}
                    <p className="italic text-gray-400 text-[1.1vw]">{series.tagline}</p>
                    {/* Movie Overview */}
                    <p className="mt-1 text-[1.3vw] font-bold">Overview</p>
                    <p className="text-[1.2vw] line-clamp-2">{series.overview}</p>
                    {/* Nav Links */}
                    <div className="mt-2 flex flex-row">
                        <p className="cursor-pointer text-[1.2vw]">Casts</p>
                        <p className="cursor-pointer text-[1.2vw] ml-8">Media</p>
                        <p className="cursor-pointer text-[1.2vw] ml-8">Reviews</p>
                        <p className="cursor-pointer text-[1.2vw] ml-8">Details</p>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default TvSeriesDetails;