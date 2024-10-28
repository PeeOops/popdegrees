import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div>
            <footer className="flex place-content-evenly items-center bg-red-950 montserrat mt-24 p-4 text-white">
                {/* Brand */}
                <Link to="/" className="flex items-center space-x-3 mt-4 mb-4 apothem   ">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">PopDegrees</span>
                </Link>
                {/* Copyright */}
                <p className="hidden sm:hidden md:block lg:block">Copyright <FontAwesomeIcon icon={faCopyright} /> 2024 - PeePoop</p>
                {/* Social Media Links */}
                <div className="flex">
                    <a href="https://x.com/" className="text-white text-center">
                        <FontAwesomeIcon icon={faXTwitter} size="1x" />
                    </a>
                    <a href="https://www.instagram.com/" className="text-white text-center ml-2">
                        <FontAwesomeIcon icon={faInstagram} size="1x" />
                    </a>
                    <a href="https://facebook.com/" className="text-white text-center ml-2">
                        <FontAwesomeIcon icon={faFacebook} size="1x" />
                    </a>
                </div>
            </footer>
        </div>
    )    
}

export default Footer;