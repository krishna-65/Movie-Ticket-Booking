import axios from "axios"

const API = "https://movie-ticket-booking-backend-7y20.onrender.com";

export const getting_movies = async()=>{

    const res = await axios.get(`${API}/movie/getallmovies`)
    .catch((error)=>{
        console.log('error fetching movies', error);
    });
 
    const data =   await res.data;
    return data;

}

export const addMovie_api = async(data)=>{
  try{ 
    console.log(data);
     const response = await axios.post(`${API}/movie`,data);
        // const data = await response.data;
        return data;
  }catch(error){
        console.log('error posting movie', error);
  }
}

export const get_movie_by_admin_id = async(id)=>{
  try{
      
    const response = await axios.get(`${API}/movie/admin/${id}`) 
    console.log(response.data);

      return response.data.data;
  }catch(error){
          console.log("error in get_movie_by_id", error);
  }
}
