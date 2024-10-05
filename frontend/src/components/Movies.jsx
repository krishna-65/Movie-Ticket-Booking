import { useEffect } from "react";
import Aos from "aos";
import MovieCart from "./reusable-component/MovieCart";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies} from "../store/reducers/movie-reducer";
import { Link } from "react-router-dom";

const Movies = ()=>{

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies); // Access the movies from state


    useEffect(()=>{
        const fun1 = async()=>{
          try{
                    const response = await dispatch(fetchMovies());
                    console.log(response);

          }catch(error){
            console.log('error fetching movies', error);
          }
        }
        fun1();
    },[])

  useEffect(()=>{
     Aos.init({duration: 1000});
  },[])

       if(movies.length === 0)
        return (
       <div className="flex justify-center items-center w-full text-white">
              <p className="text-2xl font-semibold">Loading...</p>
       </div>
      )
  return(
    <div >
                <div className="w-[90vw] mx-auto p-10 ">
                        <h2 className="text-center font-semibold text-2xl text-white my-4" data-aos="zoom-in">Latest Release Movies</h2> 

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-10 ">
                     
                        {movies.map((movie,index)=>(
                            <Link to={`/${movie._id}/description`} key={index} data-aos="zoom-in">
                                  <MovieCart movie={movie}/>
                            </Link>
                        ))}
                      </div>

                </div>
          </div>
  )
}
export default Movies; 