import { useState } from "react";
import Btn from "../components/reusable-component/Button";
import SeatSelection from "../components/Seats";
import ShowDateTimeSelector from "../components/DateTime";
import { FaArrowLeft } from "react-icons/fa";
import { movie_booking_in_Server } from "../store/reducers/Booking-Reducer";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
const Details = ()=>{
    const [price,setPrice] = useState(0);
    const [selectedSeats,setSelectedSeats] = useState([]);
    const [dateTime, setDateTime] = useState(null);

    const [arrowClick,setArrowClick] = useState(true);

  const  handleArrowClick = ()=>{
    setArrowClick(false);
    setDateTime(null)
  }

  

    const objSeat = {
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

    let formattedDate;
   if(dateTime)
    { formattedDate = dateTime.toString().split('GMT')[0].trim();}

  // Function to combine date and time into a Date object
  function createDateTimeObject(dateString, timeString) {
    // Convert date from "DD-MM-YYYY" format to "YYYY-MM-DD"
    if(dateString)
    {
        const [day, month, year] = dateString.split('-');
        const formattedDate = `${year}-${month}-${day}`;
    }
    
    // Function to convert 12-hour time format to 24-hour format (e.g., 10AM -> 10:00)
    function convertTo24Hour(time12h) {
      const period = time12h.slice(-2); // Extract AM/PM
      let [hours] = time12h.slice(0, -2).split(':');
      
      // Handle 12-hour to 24-hour conversion
      if (period === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
      if (period === 'AM' && hours === '12') hours = '00';
      
      return hours.padStart(2, '0') + ':00'; // Add minutes as "00"
    }

    // Combine formatted date with the converted time
    const dateTimeString = `${formattedDate}T${convertTo24Hour(timeString)}:00.000Z`;
    const dateTime = new Date(dateTimeString); // Create Date object

    return dateTime;
  }

  // Example function triggered when user submits date and time
  const handleSave = (date, time) => {
    const combinedDateTime = createDateTimeObject(date, time);
    setDateTime(combinedDateTime); // Save in state
  };

const handleTime =(e)=>{
    setTime(e.target.innerHTML)
}
const handleDate = (e) =>{
    setDate(e.target.innerHTML)
}

const dispatch = useDispatch();
const {id} = useParams();
const navigate = useNavigate();

const handleBookBtn = async()=>{
    try{  
      
          const token  = localStorage.getItem("token");
          if(token){
           const decodeToken = jwtDecode(token);
            const data = {
              movie: id,
              user: decodeToken.id,
              seatNumber: selectedSeats[0],
              date: dateTime,
            }
        const response = await dispatch(movie_booking_in_Server(data));
        alert("Your Seat Booked");
        navigate(`/dashboard/${response.user}`);
          }

    }catch(error){
      console.log("Error in handleBookBtn",error);
    }
}

const MovieName = useSelector((state)=>state.movie.movies);

const movie = MovieName.find((movie)=>movie._id === id);

return(
    <div className="min-h-screen bg-[#242530] w-full flex flex-col  items-center justify-evenly  p-5">

           
                <div className="w-[90%]  p-10 rounded-md shadow-lg bg-[#3a3b4d] flex flex-col md:flex-row justify-between  items-center gap-6">
                    {/* Movie Details */}
                    <h2 className="text-white font-bold text-2xl">{movie.title}</h2>

                  <div className="flex flex-col w-[90%] sm:w-[40%] lg:mx-0 mx-auto sm:flex-row gap-6 sm:gap-16 sm:items-center">
                    <p className="text-white text-lg mlr6">{formattedDate}</p>
                  <p className="text-white text-lg">₹{price}</p>
                  <Btn className={`transition-all duration-200 ${selectedSeats.length>0 ? "opacity-100 hover:scale-110":"opacity-40"} font-bold text-lg md:px-8 border-[#232430]  `} onClick={handleBookBtn}>Book</Btn>
                  </div> 
            </div>

                <div>
                    <ShowDateTimeSelector  className={`${ !dateTime || 
                        !arrowClick ? "block m-8" :"hidden"}`} 
                        objDateTime={objDateTime}/>
                </div> 

            <div className={`${dateTime && arrowClick ? "block" :"hidden"}`}>
           < FaArrowLeft className="text-white text-2xl mt-5" onClick={handleArrowClick}/>
             <SeatSelection objSeat = {objSeat}/>
            </div>

    </div>
)

}

export default Details;