import { useState } from 'react';
import Logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navigation = () => {

    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    const location = useLocation();
    const currentURL = location.pathname;

    // Toggle Mobile Navigation Links
    const handleClickToggle = () =>{
    setIsToggle(prev => !prev);
    }

    // Click Search
    const handleClickSearch = (event) => {
        if (event.key === "Enter" && currentURL === "/movies") {
            const inputValue = event.target.value.trim();
            if (inputValue) { // Prevent navigating with empty input
                navigate('/movies', { state: { query: { input: inputValue } } });
                event.target.value = ""; // Clear input after navigating
            }
        }

    }

    return(
    <div>
        <nav className="bg-red-950 montserrat">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img src={Logo} className="h-12 rounded-full border-2" alt="PopDegrees Logo" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white apothem">PopDegrees</span>
                </Link>

                <div className={`flex md:order-2 ${currentURL === "/" ? "block md:hidden" : ""}`}>
                    {/* Search Input */}
                    <div className={`relative ${currentURL === '/movies' || currentURL === '/series' ? "hidden md:block" : "hidden"} `}>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-red-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..." onKeyDown={handleClickSearch} />
                    </div>
                    {/* Hamburger Mobile Icon */}
                    <button data-collapse-toggle="navbar-search" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-red-950 bg-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-search" aria-expanded="false" onClick={handleClickToggle}>
                        <span className="sr-only">Toggle</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links Mobile */}
                <div className={`items-center justify-between ${!isToggle ? "hidden" : ""} w-full md:flex md:w-auto md:order-1`} id="navbar-search">
                    <div className={`relative mt-3 ${currentURL === "/movies" || currentURL === "/series" ? "block md:hidden" : "hidden"} `}>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-red-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-red-950 border border-red-950 rounded-lg bg-gray-50 focus:ring-red-950 focus:border-red-950"
                            placeholder="Search..." />
                    </div>

                    {/* Navigation Links */}
                    <ul
                        className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-red-950 md:items-center">
                        <li>
                            <Link to="/"
                                className={`block py-2 px-3 text-yellow-300 bg-red-950 rounded mt-2 ${currentURL === "/" ? "md:bg-transparent md:text-white md:p-0 md:border-2 md:px-2" : "md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 md:text-white"}`}
                                aria-current={`${currentURL === "/" ? "page" : ""}`}>Home</Link>
                        </li>
                        <li>
                            <Link to="/movies"
                                className={`block py-2 px-3 text-yellow-300 bg-red-950 rounded mt-2 ${currentURL === "/movies" ? "md:bg-transparent md:text-white md:p-0 md:border-2 md:px-2" : "md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 md:text-white"}`} aria-current={`${currentURL === "/movies" ? "page" : ""}`}>Movies</Link>
                        </li>
                        <li>
                            <Link to="/series"
                                className={`block py-2 px-3 text-yellow-300 bg-red-950 rounded mt-2 ${currentURL === "/series" ? "md:bg-transparent md:text-white md:p-0 md:border-2 md:px-2" : "md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 md:text-white"}`} aria-current={`${currentURL === "/" ? "/series" : ""}`}>TV Series</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Navigation;