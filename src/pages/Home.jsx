import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Hero from '../assets/hero.jpg';
import Film from '../assets/film.svg'
import { Link } from "react-router-dom";

const API_KEY = 'cbfc56177fc1d8965e8f21499c9b3ff0';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
const POPULAR_SERIES_URL = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;


const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch(POPULAR_MOVIES_URL);
                if(!response.ok){
                    throw new Error('Fetch data failed');
                }
                const data = await response.json();
                setPopularMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchTopSeries = async () => {
            try {
                const response = await fetch(POPULAR_SERIES_URL);
                if(!response.ok){
                    throw new Error('Fetch data failed');
                }
                const data = await response.json();
                setTopSeries(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        const fetchUpcomingMovies = async () => {
            try {
                const response = await fetch(UPCOMING_MOVIES_URL);
                if(!response.ok){
                    throw new Error('Fetch data failed');
                }
                const data = await response.json();
                setUpcomingMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPopularMovies();
        fetchUpcomingMovies();
        fetchTopSeries();
    }, []);

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
            
            {/* Popular Movies Section */}
            <img src={Film} alt="film" className="-z-10 hidden lg:block absolute w-120 m-0 p-0" loading="lazy"/>
            <div className="flex justify-center items-center h-auto flex-col mt-10 apothem font-bold z-10">
                <p className="text-left text-3xl">Popular Movies</p>
                <div className="flex flex-row space-x-2 mt-2">
                    {popularMovies.slice(0,1).map((movie) => (
                        <Link to={`movies/${movie.id}`} className="block"> <img key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-24 sm:w-48 md:w-64 lg:w-80 cursor-pointer" loading="lazy"  /></Link>
                    ))}
                    <div className="flex flex-col">
                        <div className="flex space-x-2">
                            {popularMovies.slice(1,5).map((movie) => (
                                <Link to={`movies/${movie.id}`} className="m-0 p-0"><img  key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-12 sm:w-24 md:w-32 lg:w-40 cursor-pointer" loading="lazy" /></Link>
                            ))}
                        </div>
                        <div className="flex space-x-2 mt-2">
                            {popularMovies.slice(5,9).map((movie) => (
                                <Link to={`movies/${movie.id}`} className="m-0 p-0"><img  key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-12 sm:w-24 md:w-32 lg:w-40 cursor-pointer" loading="lazy" /></Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col align-center justify-center items-center mt-2 z-10">
                    <div className="border-l-2 border-dashed border-black h-12"></div>
                    <p className="border-dashed border-2 border-black p-4">View All</p>
                </div>
            </div>

            {/* Top Rated TV Series Section */}
            <img src={Film} alt="film" className="-z-10 hidden lg:block absolute right-0 w-120 m-0 p-0 transform scale-x-[-1]" loading="lazy"/>
            <div className="flex justify-center items-center h-auto flex-col mt-10 apothem font-bold z-10">
                <p className="text-left text-3xl">Top Rated Series</p>
                <div className="flex flex-row space-x-2 mt-2">

                    <div className="flex flex-col">
                        <div className="flex space-x-2">
                            {topSeries.slice(1,5).map((series) => (
                                <img key={series.id} src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={series.name} className="w-12 sm:w-24 md:w-32 lg:w-40" loading="lazy" />
                            ))}
                        </div>
                        <div className="flex space-x-2 mt-2">
                            {topSeries.slice(5,9).map((series) => (
                                <img key={series.id} src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={series.name} className="w-12 sm:w-24 md:w-32 lg:w-40" loading="lazy" />
                            ))}
                        </div>
                    </div>
                    {topSeries.slice(0,1).map((series) => (
                        <img key={series.id} src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt={series.name} className="w-24 sm:w-48 md:w-64 lg:w-80" />
                    ))}

                </div>
                <div className="flex flex-col align-center justify-center items-center mt-2">
                    <div className="border-l-2 border-dashed border-black h-12"></div>
                    <p className="border-dashed border-2 border-black p-4">View All</p>
                </div>
            </div>

            {/* Upcoming Movies Section */}
            <img src={Film} alt="film" className="-z-10 hidden lg:block absolute w-120 m-0 p-0" loading="lazy"/>
            <div className="flex justify-center items-center h-auto flex-col mt-10 apothem font-bold z-10">
                <p className="text-left text-3xl">Upcoming Movies</p>
                <div className="flex flex-row space-x-2 mt-2">
                    <div className="flex flex-col">
                        <div className="flex space-x-2">
                            {upcomingMovies.slice(1,7).map((movie) => (
                                <img  key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-12 sm:w-24 md:w-32 lg:w-40" loading="lazy" />
                            ))}
                        </div>
                        <div className="flex space-x-2 mt-2">
                            {upcomingMovies.slice(7,13).map((movie) => (
                                <img key={movie.id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-12 sm:w-24 md:w-32 lg:w-40" loading="lazy" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col align-center justify-center items-center mt-2 z-10">
                    <div className="border-l-2 border-dashed border-black h-12"></div>
                    <p className="border-dashed border-2 border-black p-4">View All</p>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Home;