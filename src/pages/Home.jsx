import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Hero from '../assets/hero.jpg';
import Deadpool from '../assets/movies/deadpool.jpg';
import BadBoys from '../assets/movies/bad-boys.jpg';
import FamilyGuy from '../assets/movies/family-guy.jpg';
import InsideOut from '../assets/movies/inside-out.jpg';
import Joker from '../assets/movies/joker.jpg';
import Platform from '../assets/movies/platform-2.jpg';
import Smile from '../assets/movies/smile.jpg';
import Speak from '../assets/movies/speak.jpg';
import Venom from '../assets/movies/venom.jpg';

const Home = () => {
    return(
        <div>
            <Navigation />
            <div className="relative w-full h-screen">
                <img 
                    src={Hero} 
                    alt="Hero" 
                    className="absolute inset-0 object-cover w-full h-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <h1 className="text-white text-center text-3xl font-bold montserrat md:text-4xl">Where Every Movie Finds Its Spotlight!</h1>
                </div>
            </div>

            <div className="flex justify-center items-center h-auto flex-col mt-10 apothem font-bold">
                <p className="text-left text-3xl">Popular Movies</p>
                <div className="flex flex-row space-x-2 mt-2">
                    <img src={Venom} alt="" className="w-24 sm:w-48 md:w-64 lg:w-80" />
                    <div className="flex flex-col">
                        <div className="flex space-x-2">
                            <img src={Deadpool} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={BadBoys} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={FamilyGuy} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={InsideOut} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                        </div>
                        <div className="flex space-x-2 mt-2">
                            <img src={Joker} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={Platform} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={Smile} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={Speak} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col align-center justify-center items-center mt-2">
                    <div className="border-l-2 border-dashed border-black h-12"></div>
                    <p className="border-dashed border-2 border-black p-4">View All</p>
                </div>

            </div>
            <div className="flex justify-center items-center h-auto flex-col mt-10 apothem font-bold">
                <p className="text-left text-3xl">Popular Series</p>
                <div className="flex flex-row space-x-2 mt-2">

                    <div className="flex flex-col">
                        <div className="flex space-x-2">
                            <img src={Deadpool} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={BadBoys} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={FamilyGuy} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={InsideOut} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                        </div>
                        <div className="flex space-x-2 mt-2">
                            <img src={Joker} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={Platform} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={Smile} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                            <img src={Speak} alt="" className="w-12 sm:w-24 md:w-32 lg:w-40" />
                        </div>
                    </div>
                    <img src={Venom} alt="" className="w-24 sm:w-48 md:w-64 lg:w-80" />
                </div>
                <div className="flex flex-col align-center justify-center items-center mt-2">
                    <div className="border-l-2 border-dashed border-black h-12"></div>
                    <p className="border-dashed border-2 border-black p-4">View All</p>
                </div>

            </div>
            <Footer />

        </div>
    )
}

export default Home;