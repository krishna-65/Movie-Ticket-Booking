import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Footer = () => {

  useEffect(()=>{
    Aos.init({duration: 1000});
 },[])

    return (
      <footer className="bg-[#31323f] hover:shadow-xl hover:shadow-[#00aaff66] mt-10 rounded-md shadow text-white py-8 w-[90%] mx-auto " data-aos="zoom-in">
        <div className="container mx-auto px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-xl text-gray-200 font-semibold mb-4">MovieVerse</h4>
            <p className="text-gray-400 ">
              Your ultimate destination for all the latest movies and showtimes.
              Book your tickets easily and enjoy your favorite films!
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#home" className="hover:underline text-sm sm:text-md">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline text-sm sm:text-md">
                  About Us
                </a>
              </li>
              <li>
                <a href="#movies" className="hover:underline text-sm sm:text-md">
                  Latest Movies
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline text-sm sm:text-md">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
  
          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-200">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="mailto:support@movieverse.com" className="hover:underline text-[12px] text-md">
                  support@movieverse.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:underline text-sm sm:text-md">
                  +1 234 567 890
                </a>
              </li>
              <li>
                <p className="text-sm sm:text-md">123 Movie Street, Film City, Hollywood</p>
              </li>
            </ul>
          </div>
  
          {/* Social Media Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gray-200">Follow Us</h4>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className=" hover:text-white">
              <FaFacebook  className="text-xl sm:text-3xl"/>
              </a>
              <a href="https://twitter.com" className=" hover:text-white">
              <FaLinkedin  className="text-xl sm:text-3xl"/>
              </a>
              <a href="https://www.instagram.com/krishna_52_/profilecard/?igsh=ZG1ycG8yaDN6dDBj" className=" hover:text-white">
              <FaInstagram  className="text-xl sm:text-3xl"/>
              </a>
            </div>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4">
          <div className="container mx-auto text-center text-gray-400">
            <p className="text-sm sm:text-md">&copy; 2024 MovieVerse. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  