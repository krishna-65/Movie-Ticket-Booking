import { useEffect, useState } from "react";
import Btn from "../components/reusable-component/Button";
import SeatSelection from "../components/Seats";
import ShowDateTimeSelector from "../components/DateTime";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { movie_booking_in_Server } from "../store/reducers/Booking-Reducer";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import PopupModal from "../components/reusable-component/Confirm";
const Details = ()=>{
    const [price,setPrice] = useState(0);
    const [selectedSeats,setSelectedSeats] = useState([]);
    const [dateTime, setDateTime] = useState(null);
  
    const [arrowClick,setArrowClick] = useState(true);

    const [loading, setLoading]  =useState(false);

  const  handleLeftArrowClick = ()=>{
    setArrowClick(false);
    setDateTime(null)
  }

  const  handleRightArrowClick = ()=>{
    if(dateTime)
    setArrowClick(true);
    
  }

  

    const objSeat = {
      dateTime:dateTime,
        price:price,
        setPrice:setPrice,
        selectedSeats: selectedSeats,
        setSelectedSeats: setSelectedSeats,
    }

    const objDateTime = {
        dateTimeObject:dateTime,
        setDateTimeObject:setDateTime,
        setArrowClick:setArrowClick,
    }
    
      const date = new Date(dateTime);
      const isoDate = date.toISOString(); 

    let formattedDate;
   if(dateTime)
    { formattedDate = dateTime.toString().split('GMT')[0].trim();}


  const [movie,setMovie] = useState([]);
  const MovieName = useSelector((state)=>state.movie.movies);
    useEffect(()=>{
    setMovie(MovieName.find((movie)=>movie._id === id));
    },[])



const dispatch = useDispatch();
const {id} = useParams();
const navigate = useNavigate();

const handleBookBtn = async()=>{
    try{  
          setLoading(true);
          const token  = localStorage.getItem("token");
          if(token){
           const decodeToken = jwtDecode(token);
            const data = {
              movie: id,
              user: decodeToken.id,
              seatNumber: selectedSeats[0],
              date: isoDate,
            }
        const response = await dispatch(movie_booking_in_Server(data));
            setPopShow(true);
                    }

    }catch(error){
      console.log("Error in handleBookBtn",error);
    }
}

const [popShow,setPopShow] =useState(false);
if(popShow)
return(
  <PopupModal message={"Booking Confirm"} isOpen={true} onClose={setPopShow}/>
 )

return(
    <div className="min-h-screen bg-[#242530] w-full flex flex-col  items-center justify-evenly  p-5">

           
                <div className="w-[90%]  p-10 rounded-md shadow-lg bg-[#3a3b4d] flex flex-col md:flex-row justify-between  items-center gap-6">
                    {/* Movie Details */}
                    <h2 className="text-white font-bold text-2xl">{movie.title}</h2>

                  <div className="flex flex-col w-[90%] sm:w-[40%] lg:mx-0 mx-auto sm:flex-row gap-6 sm:gap-16 sm:items-center">
                    <p className="text-white text-lg mlr6">{formattedDate}</p>
                  <p className="text-white text-lg">₹{price}</p>
                  <Btn className={`transition-all duration-200 ${selectedSeats.length>0 && loading === false ? "opacity-100 hover:scale-110":"opacity-40"}  font-bold text-lg md:px-8 border-[#2d2e3f]  `} onClick={handleBookBtn}>{loading ? "Booking" : "Book"}</Btn>
                  </div> 
            </div>

                <div className={`${ !dateTime || 
                        !arrowClick ? "block m-8" :"hidden"}`} >
                    <div className="flex justify-end">
                    < FaArrowRight className="mr-8 text-white text-2xl mb-10" onClick={handleRightArrowClick}/>
                    </div>
                    <ShowDateTimeSelector  
                        objDateTime={objDateTime}/>
                </div> 

            <div className={`${dateTime && arrowClick ? "block" :"hidden"}`}>
           < FaArrowLeft className="text-white text-2xl mt-5" onClick={handleLeftArrowClick}/>
             <SeatSelection objSeat = {objSeat}/>
            </div>

    </div>
)

}

export default Details;