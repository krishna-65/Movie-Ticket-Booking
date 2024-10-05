import axios from "axios";
import Login from "../pages/Login";

export const AddUser = async(userData)=>{
    try{

        const response = await axios.post('http://localhost:3001/user/signup',userData)
      
        return response.data;

    }catch(error){
        console.error('Error adding user', error);
        alert('Error adding user');
    }
    
}



export const LoginUser = async(userData)=>{
    try{
        console.log(userData);
        const response = await axios.post('http://localhost:3001/user/login', userData);
        return response.data;

    }catch(error){
        console.error('Error logging in user', error);
        alert(error.response.data.message);
    }
}

export const AddAdmin = async(userData)=>{
    try{

        const response = await axios.post('http://localhost:3001/admin/signup',userData)
        console.log('User added successfully', response.data);
        return response.data;

    }catch(error){
        console.error('Error adding user', error);
        alert('Error adding user');
    }
    
}



export const LoginAdmin = async(userData)=>{
    try{
        console.log(userData);
        const response = await axios.post('http://localhost:3001/admin/login', userData)
        console.log('User logged in successfully', response.data);
        return response.data;

    }catch(error){
        console.error('Error logging in user', error);
        alert(error.response.data.message);
    }
}
