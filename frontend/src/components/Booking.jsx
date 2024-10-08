import { useEffect, useState } from "react";
import { book,  getBooking_from_Server_for_user } from "../store/reducers/Booking-Reducer";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Booking = ()=>{
    const [bookings, setBookings] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=>{
       const fun1 = async()=>{
                    const token = localStorage.getItem("token");
                    if(token) {
                        const decodedToken = jwtDecode(token);
                    try{
                        const response  = await dispatch(getBooking_from_Server_for_user(decodedToken.id));
                        setBookings(response);

                    }catch(error){
                        console.log("Error in getting bookings",error);
                    }
                }
       }
       fun1();
    },[])
    const movie = useSelector((state)=>state.movie.movies);
    const {id} = useParams();
     if(!bookings)
    return (
       <div className="w-full h-[80vh] flex justify-center items-center">
             <h1 className="text-[#ebedf2] font-semibold text-2xl">Loading...</h1>
       </div>
    )
    
    if(bookings.length === 0){
        return (  <div className="w-full h-[80vh] flex justify-center items-center">
               <h1 className="text-[#ebedf2] font-semibold text-2xl">No Booking Available</h1>
         </div>)
      }

    return(
        <div className="w-full min-h-[80vh] flex gap-16">
                 <div className="w-[90%] mx-auto ">
                 {
                        bookings.map((booking,index)=>(
                            <div key={index} className="bg-[#3a3b4d] text-white p-10 shadow rounded-lg mb-4 flex flex-col sm:flex-row justify-between">
                               <div>
                                        <h1 className="text-gray-200 font-semibold">Booking ID: <span className="text-sm sm:text-md ">{booking._id}</span></h1>
                                            <h1 className="text-gray-200 font-semibold my-1">Movie: {movie.find((m,i)=>m.id === booking.movieId)?.title}</h1>
                                            <h1 className="text-gray-200 font-semibold">Seat Number: {booking.seatNumber}</h1>
                                            <h1 className="text-gray-200 font-semibold my-1">Show Time: {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                                            <h1 className="text-gray-200 font-semibold my-1">Date: {new Date(booking.date).toLocaleDateString()}</h1>
                               </div>
                               <div className="flex mt-10 sm:mt-0 flex-col justify-center gap-5">
                                        <Link to={`/generateqr/${booking._id}`}  className="text-center px-6 py-2  hover:scale-110 hover:font-bold transition-all duration-200 bg-green-700 rounded-md shadow  text-md font-semibold">Generate QR</Link>
                                        <Link to={`/canclebooking/${booking._id}`} className="px-6 py-2 hover:scale-110 hover:font-bold transition-all duration-200  text-center rounded-md shadow  bg-red-400 text-md font-semibold">Cancle</Link>
                               </div>
                              
                            </div>
                        ))
                    }
                 </div>
        </div>
    )
}
export default Booking;