import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div>
            <footer className="flex place-content-evenly items-center bg-red-950 montserrat mt-24 p-4 text-white">
                <Link to="/" className="flex items-center space-x-3 mt-4 mb-4 apothem">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">PopDegrees</span>
                </Link>
                <p className="hidden sm:hidden md:block lg:block">Copyright <i className="fa-regular fa-copyright"></i> 2024 - PeePoop</p>
                <div className="flex">
                    <a href="https://x.com/" className="text-red-950 bg-white p-2 rounded-md text-center">
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/" className="text-red-950 bg-white p-2 rounded-md text-center ml-2">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://facebook.com/" className="text-red-950 bg-white p-2 rounded-md text-center ml-2">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                </div>
            </footer>
        </div>
    )    
}

export default Footer;