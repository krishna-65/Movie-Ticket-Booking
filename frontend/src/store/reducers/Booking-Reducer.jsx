import { createSlice } from "@reduxjs/toolkit";
import { getting_booking, movie_booking } from "../../api-handling/Apis-for-booking";

const initialState = {
    booking:null,
}

const bookingSlice = createSlice({
    name:'booking',
    initialState,
    reducers:{
        book:(state,action)=>{
            state.booking.push(action.payload);
        },
        getBooking:(state,action)=>{
                state.booking = action.payload;
        }
    }
})

export const {book, getBooking} = bookingSlice.actions;

export const getBooking_from_Server = (data) => async(dispatch) =>{
    try{
        const response = await getting_booking(data);
        dispatch(getBooking(response));
        return response; // Dispatch the getBooking action with the fetched data

    }catch(error){
        console.log("Error in getBooking_from_server", error);
    }
}

export const movie_booking_in_Server = (data)=>async(dispatch)=>{
    try{
        const response = await movie_booking(data);
        dispatch(book(response));
        return response; // Dispatch the book action with the fetched data

    }catch(error){
        console.log("Error in movie_booking_in_server", error);
    }
}