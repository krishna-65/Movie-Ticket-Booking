import { createSlice } from "@reduxjs/toolkit";
import { AddAdmin, AddUser, LoginAdmin, LoginUser } from "../../api-handling/Apis-for-user";


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
        }
    }
})

export const {login, signup}  = userSlice.actions;

export const login_In_user_Database = (data)=>async(dispatch)=>{
            try{
                    const response = await LoginUser(data);
                    dispatch(login(response));
                 
                    return response;
            }catch(error){
                console.log("Error in login_In_Database", error);
            }
}
export const signup_In_user_Database = (data)=>async(dispatch)=>{
            try{
                        const response = await AddUser(data);
                        dispatch(signup(response.data));
                        return response;
            }catch(error){
                console.log("Error in signup_In_Database", error);
            }
}

export const login_In_admin_Database = (data)=>async(dispatch)=>{
    try{
            const response = await LoginAdmin(data);
            dispatch(login(response));
            return response;
    }catch(error){
        console.log("Error in login_In_Database", error);
    }
}
export const signup_In_admin_Database = (data)=>async(dispatch)=>{
    try{
                const response = await AddAdmin(data);
                dispatch(signup(response.data));
                return response;
    }catch(error){
        console.log("Error in signup_In_Database", error);
    }
}



export default userSlice.reducer;
