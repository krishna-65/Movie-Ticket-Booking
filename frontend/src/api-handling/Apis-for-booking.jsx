import axios from "axios";



export const getting_booking = async(userId)=>{
    try{
        const response = await axios.get(`http://localhost:3001/booking/${userId}`);
        // const data = await response.data;
        return response.data.data;
    }catch(error){
        console.log("Error in getting_booking", error);
    }
}




export const movie_booking = async(data) =>{
    try{
            const response = await axios.post('http://localhost:3001/booking',data);
            console.log(response);
            return response.data.data;
    }catch(error){
        console.log("Error in movie_booking", error);
    }
}