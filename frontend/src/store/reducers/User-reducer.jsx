import { createSlice } from "@reduxjs/toolkit";
import { AddAdmin, AddUser, LoginAdmin, LoginUser ,addReview} from "../../api-handling/Apis-for-user";


const initialState = {
    user:null,
    error:null
    
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        signup:(state,action)=>{
            state.user = action.payload;
        },
        review:(state,action)=>{
                state.user.reviews.push(action.payload); // Add a new review to the user's list
        }
    }
})

export const {login, signup}  = userSlice.actions;

export const login_In_user_Database = (data)=>async(dispatch)=>{
            try{
                    const response = await LoginUser(data);
                    if(response.status === 200)
                   { dispatch(login(response));}
                    
                    return response;
            }catch(error){
                console.log("Error in login_In_Database", error);
            }
}
export const signup_In_user_Database = (data)=>async(dispatch)=>{
            try{
                        const response = await AddUser(data);
                        if(response.status === 200)
                        {dispatch(signup(response.data));}
                        return response;
            }catch(error){
                console.log("Error in signup_In_Database", error);
            }
}

export const login_In_admin_Database = (data)=>async(dispatch)=>{
    try{
            const response = await LoginAdmin(data);
            if(response.status === 200)
           { dispatch(login(response));}
            return response;
    }catch(error){
        console.log("Error in login_In_Database", error);
    }
}
export const signup_In_admin_Database = (data)=>async(dispatch)=>{
    try{
                const response = await AddAdmin(data);
                if(response.status === 200)
               { dispatch(review(response.data));}
                return response;
    }catch(error){
        console.log("Error in signup_In_Database", error);
    }
}

export const AddReview = (data)=>async(dispatch)=>{
    try{
        const response = await addReview(data);
        if(response.status === 200)
            { dispatch(signup(response.data));}
        return response;
    }catch(error){
        console.log("Error in adding review", error);
    }
} 


export default userSlice.reducer;
