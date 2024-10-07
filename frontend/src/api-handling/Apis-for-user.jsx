import axios from "axios";


const API = "https://movie-ticket-booking-backend-7y20.onrender.com";

export const AddUser = async(userData)=>{
    try{

        const response = await axios.post(`${API}/user/signup`,userData)
      
        return response.data;

    }catch(error){
        console.error('Error adding user', error);
        return error;
    }
    
}



export const LoginUser = async(userData)=>{
    try{
        const response = await axios.post(`${API}/user/login`, userData);
        return response.data;

    }catch(error){
        console.error('Error logging in user', error);
        return error;
    }
}

export const AddAdmin = async(userData)=>{
    try{

        const response = await axios.post(`${API}/admin/signup`,userData)
        console.log('User added successfully', response.data);
        return response;

    }catch(error){
        console.error('Error adding user', error);
        return error;
    }
    
}



export const LoginAdmin = async(userData)=>{
    try{
        console.log(userData);
        const response = await axios.post(`${API}/admin/login`, userData)
        return response.data;

    }catch(error){
        console.error('Error logging in user', error);
        return error;
    }
}
