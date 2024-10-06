import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const navigate = useNavigate();

    const handleOnClick = ()=>{
        const token = localStorage.getItem('token');
        if(!token){
                navigator('/login');
        }
    }

  return (
    <div className="bg-[#3a3b4d] py-10 md:p-20 hover:shadow-xl hover:shadow-[#00aaff66] rounded-md shadow text-white flex flex-col md:flex-row justify-center items-center w-[90%] mx-auto mt-10">
        <div className='w-[90%] md:w-[50%]'>
            <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-[100%] rounded-md hover:shadow-xl hover:shadow-[#00aaff66]' />
        </div>
      <div className="text-center p-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Our Movie Booking</h1>
        <p className="text-md md:text-lg mb-6">
          Book your favorite movies at the best prices. Enjoy the experience!
        </p>
        <a href="#movies" onClick={handleOnClick} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Hero;
