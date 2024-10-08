import { useEffect, useState } from "react"
import PopupModal from "./reusable-component/Confirm"
import { cancleBooking } from "../store/reducers/Booking-Reducer";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Cancle_booking = ()=>{

        const [popShow,popClose] = useState(true);
    const [canceled,setCanceled] = useState('');
        const { id } = useParams();  // Assuming id is passed as a parameter

        const navigate = useNavigate();
  useEffect(() => {
    // Show "Hello" for 2 seconds and then redirect
    if(canceled)
   { const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 8000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);}
  }, [canceled])

        const dispatch = useDispatch();
      const removeBooking = async()=>{
   
                    try{
                        const response = await dispatch(cancleBooking(id))
                        .then((response)=>setCanceled(response.message))
                        .catch(error=>setCanceled(error.message));
                    }catch(error){
                        console.log("Error in cancle booking",error);
                    }
                }
        

        if(popShow)
    return(
                <PopupModal isOpen={true} message={"Are You Sure"} onClose={popClose} removeBooking={removeBooking} show={true}/>
    )
    else if(setCanceled){
        <div className="flex justify-center items-center min-h-screen bg-[#242530]">
                <p className="text-white text-xl font-semibold">{canceled}</p>
         
        </div>
    }
}

export default Cancle_booking;