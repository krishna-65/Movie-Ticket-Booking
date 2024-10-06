import { createSlice } from "@reduxjs/toolkit";
import { all_bookings, getting_booking, movie_booking } from "../../api-handling/Apis-for-booking";


const initialState = {
    bookings:[],
    userBooking:[]
}

const bookingSlice = createSlice({
    name:'booking',
    initialState,
    reducers:{
        book:(state,action)=>{
            state.bookings.push(action.payload);
            state.userBooking.push(action.payload); // Add the booking to the user's booking list
        },
        getUserBooking:(state,action)=>{
                state.userBooking = action.payload;
        },
        getAllBookings:(state,action)=>{
            state.bookings = action.payload; // Update the bookings array
        }
        
    }
});

export const {book,getUserBooking, getAllBookings} = bookingSlice.actions;

export const getAllBookings_from_server = () => async(dispatch) =>{
    try{
        const response = await all_bookings();
        dispatch(getAllBookings(response));
        return response;  // Dispatch the getAllBookings action with the fetched data
    }catch(error){
        console.log("Error in getAllBookings_from_server", error);
    }
}

export const getBooking_from_Server_for_user = (data) => async(dispatch) =>{
    try{
        const response = await getting_booking(data);
        dispatch(getUserBooking(response));
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

export default bookingSlice.reducer;
