import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movie-reducer"; // Ensure you export the default reducer from movieSlice
import userReducer from "./reducers/user-reducer";
import bookingReducer from "./reducers/booking-reducer";


export const store = configureStore({
    reducer: {
        movie: movieReducer,
        user:userReducer,
        booking:bookingReducer, // Use the reducer as "movie" instead of "movieReducer"
    },
});

export default store;
