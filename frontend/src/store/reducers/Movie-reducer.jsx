import { createSlice } from "@reduxjs/toolkit";
import { getting_movies, addMovie_api, get_movie_by_admin_id } from "../../api-handling/Apis-for-movie.jsx";




const initialState = {
    movies: [],
    adminMovies:[], // Change from value to movies to store the movie list
};



export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getAllMovies: (state, action) => {
            state.movies = action.payload; // Update the movies array
        },
        addMovie: (state, action) => {
            state.movies.push(action.payload); // Add a new movie to the list
        },
        getAdminMovies: (state, action) => {
            state.adminMovies = action.payload; // Update the movies array
        }
    },
});

// Export actions
export const { getAllMovies, addMovie, getAdminMovies } = movieSlice.actions;

// Fetch movies from the backend
export const fetchMovies = () => async (dispatch) => {
    try {
        const response = await getting_movies();
       
        dispatch( getAllMovies(response.data)); // Dispatch the getMovies action with the fetched data
        return response.data;
    } catch (error) {
        console.error('Error fetching movies', error);
    }
};

export const addMovieInServer = (data) => async (dispatch) => {
    try {
        
        // Make API call to add the movie
        const response = await addMovie_api(data);
        console.log('Response from API:', response);
        
            dispatch(addMovie(response.body));
            return response.body;  
    } catch (error) {
        console.error('Error adding movie:', error);
        throw error;  // Throw the error so it's caught in the component
    }
}

export const get_Movie_Admin_Id = (id) =>async(dispatch)=>{
    try{
        const response = await get_movie_by_admin_id(id);
        dispatch(getAdminMovies(response));
        return response;
    }catch(error){
        console.log("Error in get_movie_admin_id", error);
    }
}
export default movieSlice.reducer;
