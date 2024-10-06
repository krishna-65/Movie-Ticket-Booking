import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/Movie-reducer"; // Ensure you export the default reducer from movieSlice
import userReducer from "./reducers/User-reducer";
import bookingReducer from "./reducers/Booking-Reducer";


export const store = configureStore({
    reducer: {
        movie: movieReducer,
        user:userReducer,
        booking:bookingReducer, // Use the reducer as "movie" instead of "movieReducer"
    },
});

export default store;
