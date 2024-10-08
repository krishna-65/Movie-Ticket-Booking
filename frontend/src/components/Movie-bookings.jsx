import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Movie_bookings = ()=>{
    const movies = useSelector((state) => state.movie.movies);
    const { id } = useParams();
    const movie = movies.find(movie => movie._id === id);
     const bookings = useSelector((state)=>state.booking.bookings);
     const [movieBookings,setMovieBookings] = useState('');

  useEffect(()=>{
    setMovieBookings(bookings.filter((booking)=>booking.movie === id));
  },[])
        console.log(movieBookings);
        if(!movieBookings)
        {
            return <div className="min-h-screen bg-[#242530] p-10">
                <h2 className="font-mono text-white font-semibold text-2xl">Bookings for <span className="text-green-400">{movie.title}</span></h2>
                <div className="h-[80vh] flex justify-center items-center">
                <h2 className="text-white font-semibold font-mono">Booking Not Found</h2>
            </div>
            </div>
        }
    return(
        <div className="min-h-screen bg-[#242530]">
               <div className="flex flex-col gap-10 items-center p-3">
                <h2 className="font-mono text-white font-semibold text-2xl">Bookings for <span className="text-green-200">{movie.title}</span></h2>
               {movieBookings.map((booking,index)=>(
                    <div key={index} className="p-5 rounded-md text-gray-200 shadow-lg hover:shadow-[#00aaff66] flex flex-col w-[80%] mx-auto bg-[#3a3b4d]">
                        <h2>Booking_Id: {booking._id}</h2>
                        <h2>Seat Number: {booking.seatNumber}</h2>
                        <h1 className="text-gray-200 font-semibold my-1">Show Time: {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                        <h1 className="text-gray-200 font-semibold my-1">Date: {new Date(booking.date).toLocaleDateString()}</h1>
                    </div>
                ))}
               </div>
        </div>
    )
}
export default Movie_bookings;