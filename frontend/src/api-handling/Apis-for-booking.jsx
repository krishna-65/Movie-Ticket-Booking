import axios from "axios";

const API = "https://movie-ticket-booking-backend-7y20.onrender.com";

export const getting_booking = async(userId)=>{
    try{
        const response = await axios.get(`${API}/booking/${userId}`);
        // const data = await response.data;
        return response.data.data;
    }catch(error){
        console.log("Error in getting_booking", error);
    }
}




export const movie_booking = async(data) =>{
    try{
                console.log(data);
        const response = await axios.post(`${API}/booking/addbooking`,data);
            console.log(response);
            return response.data.data;
    }catch(error){
        console.log("Error in movie_booking", error);
    }
}


export const all_bookings = async()=>{
    try{
        const response = await axios.get(`${API}/booking`);
        return response.data.data;
        }catch(error){
            console.log("Error in movie_booking", error);
        }
}

export const delete_bookings = async(id)=>{
    try{
        const response = await axios.delete(`${API}/booking/delete/${id}`);
        return response.data.data;
        }catch(error){
            console.log("Error in movie_booking", error);
        }
}
