import { useEffect, useState } from "react";
import { book,  getBooking_from_Server_for_user } from "../store/reducers/Booking-Reducer";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

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
                        console.log(bookings);

                    }catch(error){
                        console.log("Error in getting bookings",error);
                    }
                }
       }
       fun1();
    },[])
    console.log(bookings);
    const movie = useSelector((state)=>state.movie.movies);

    if(!bookings)
    return (
       <div className="w-full h-[80vh] flex justify-center items-center">
             <h1 className="text-[#ebedf2] font-semibold text-2xl">No Booking Available</h1>
       </div>
    )

    return(
        <div className="w-full min-h-[80vh] flex gap-16">
                 <div className="w-[90%] mx-auto ">
                 {
                        bookings.map((booking,index)=>(
                            <div key={index} className="bg-[#3a3b4d] text-white p-10 shadow rounded-lg mb-4">
                                <h1 className="text-gray-200 font-semibold">Booking ID: {booking._id}</h1>
                                <h1 className="text-gray-200 font-semibold my-1">Movie: {movie.find((m,i)=>m.id === booking.movieId)?.title}</h1>
                                <h1 className="text-gray-200 font-semibold">Seat Number: {booking.seatNumber}</h1>
                                <h1 className="text-gray-200 font-semibold my-1">Show Time: {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h1>
                                <h1 className="text-gray-200 font-semibold my-1">Date: {new Date(booking.date).toLocaleDateString()}</h1>
                              
                            </div>
                        ))
                    }
                 </div>
        </div>
    )
}
export default Booking;