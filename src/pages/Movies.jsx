import { useState } from 'react';
import Venom from '../assets/movies/venom.jpg';

const Movies = () => {
    
    const [isNavChange, SetIsNavChange] = useState("cast");

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
            <div className="bg-white h-screen w-1/3 p-10">
                <i className="fa-solid fa-arrow-left mb-8"> Back</i>
                <img src={Venom} alt="" className="rounded-lg w-96 m-auto"/>
            </div>
            <div className="bg-red-950 h-screen w-2/3 p-10 text-white montserrat overflow-x-hidden">
                <div className="flex space-x-80 items-center flex-row">
                    <h1 className="text-4xl font-bold">Venom: The Last Dance (2024)</h1>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="flex space-x-4 items-center flex-row">
                    <p>Action, Science, Fiction, Adventure</p>
                    <p className="p-1 border-white border-2 rounded-md font-bold">PG-13</p>
                </div>
                <p className="italic text-gray-400">'Til death to they part.</p>
                <p className="mt-2 text-lg font-bold">Overview</p>
                <p>Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.</p>
                <div className="mt-2 flex flex-row">
                    <p className={`cursor-pointer ${isNavChange === "cast" ? "border-b-4" : ""}`} onClick={() => handleClickNavChange("cast")}>Casts</p>
                    <p className={`cursor-pointer ml-8 ${isNavChange === "media" ? "border-b-4" : ""}`}>Media</p>
                    <p className={`cursor-pointer ml-8 ${isNavChange === "reviews" ? "border-b-4" : ""}`}>Reviews</p>
                    <p className={`cursor-pointer ml-8 ${isNavChange === "details" ? "border-b-4" : ""}`} onClick={() => handleClickNavChange("details")}>Details</p>
                </div>
                {/* Casts */}
                <div className={isNavChange === "cast" ? "block" : "hidden"}>
                    <p className="mt-2 text-lg font-bold">Top Cast</p>
                    <div className="flex space-x-2 overflow-x-auto w-full">
                    {Array.from({ length: 7 }).map((_, index) => (
                            <div key={index} className="bg-white text-red-950 rounded-lg w-40 flex-shrink-0 mb-2">
                                <img 
                                    src="https://media.themoviedb.org/t/p/w300_and_h450_bestv2/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg" 
                                    alt="" 
                                    className="rounded-t-lg" 
                                />
                                <p className="montserrat font-bold m-1.5">Tom Hardy</p>
                                <p className="m-1.5 text-sm">as Eddie Brock / Venom</p>
                            </div>
                        ))}
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
                        <p>Post Production</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <p className="font-bold">Original Language: </p>
                        <p>English</p>
                    </div>

                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <p className="font-bold">Budget: </p>
                        <p>$110,000,000.00</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center mt-2">
                        <p className="font-bold">Revenue: </p>
                        <p>-</p>
                    </div>


                </div>


            </div>
        </div>
    )
}

export default Movies;