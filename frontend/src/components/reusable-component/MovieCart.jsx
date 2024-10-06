

import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css"; // Make sure to import AOS styles


const MovieCart = ({movie}) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);


  return (
   

   
       <div className="w-full  h-[300px] sm:h-[500px] lg:p-10 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00aaff66]" data-aos="zoom-in">
                <img src={movie.posterUrl} loading="lazy" alt="image" className="w-full h-full object-contain  rounded-md shadow-lg shadow-gray-600" />

                <div className="movie-info text-center mt-4 text-white">
      <h3 className="text-lg font-semibold">{movie.title}</h3>
    </div>
            </div>
   

  

  );
};

export default MovieCart;


