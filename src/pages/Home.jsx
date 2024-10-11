import React from "react";
import Navigation from "../components/Navigation";
import Hero from '../assets/hero.jpg';

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
            <div>
                <h1>test</h1>
            </div>

        </div>
    )
}

export default Home;