import { Link } from "react-router-dom";
import Btn from "./reusable-component/Button";

const Navbar = ()=>{
    return(
      <div className="bg-[#3a3b4d] w-[90%] mx-auto  rounded-lg  text-white flex justify-between items-center py-5 px-5 shadow ">

        <div className="px-7 py-2 font-semibold text-md hover:scale-125 transition-all duration-200">The Movie App</div>

        <ul className="flex gap-10">
          <a href="#home" className="hover:cursor-pointer  font-semibold text-md   transition-all duration-100">Home</a>
          <a href="#movies" className="hover:cursor-pointer  font-semibold text-md  transition-all duration-100">Movies</a>
          <a href="#about" className="hover:cursor-pointer  font-semibold text-md  transition-all duration-100">About</a>
          <a href="#about" className="hover:cursor-pointer font-semibold text-md transition-all duration-100">Contact us</a>
        </ul>

        <div className="flex gap-10 ">
          <Btn className="border-gray-500 border-4 hover:scale-110 transition-all duration-200 px-6" linkto={'/register'}>
              Signup
          </Btn>
          <Btn className="border-gray-500 border-4 hover:scale-110 transition-all duration-200 px-6"  linkto={'/login'}>
              Login
          </Btn>
        </div>

      </div>
    )
}
export default Navbar;