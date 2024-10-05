import { useEffect,  } from "react";
import Aos from "aos";
import MovieCart from "./reusable-component/MovieCart";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import {  get_Movie_Admin_Id } from "../store/reducers/movie-reducer";
import { Link, useParams } from "react-router-dom";



const AdminMovies = ()=>{
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.adminMovies); // Access the adminId from state

  const {id} = useParams();

    useEffect(()=>{
        

        const response = dispatch(get_Movie_Admin_Id(id))
       .then((response)=> console.log(response))
       .catch((error)=>console.log(error));
       
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
                <div className="w-[90vw] mx-auto p-10">

                        <h2 className="text-center font-semibold text-2xl text-white my-10" >My Movies</h2> 

                       <div className="flex w-[90%] flex-wrap flex-shrink-0 justify-center gap-20 ">
                        {movies.map((movie,index)=>(
                            <Link to={`/${movie._id}/description`} key={index}  >
                                  <MovieCart movie={movie}/>
                            </Link>
                        ))}
                         </div>
                </div>
          </div>
  )
}
export default AdminMovies;