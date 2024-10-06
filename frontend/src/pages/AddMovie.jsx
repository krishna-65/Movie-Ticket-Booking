import Aos from "aos";
import { useEffect, useState } from "react";
import { addMovie, addMovieInServer } from "../store/reducers/movie-reducer";
import { useDispatch } from "react-redux";
const AddMovie = ()=>{
   
    // const [user,setUser] = useState("User");

    // const handleUserChange = (e)=>{
          
    //     setUser(e.target.innerHTML);
    // }
    

    useEffect(()=>{
        Aos.init({duration: 1000});
    })
    const [formData, setFormData] = useState({
        title: '',
        releaseDate: '',
        actors: [],  // Array to store actor names
        posterUrl: '',
        featured: false,
        description: ''
      });


    
      const [inputValue, setInputValue] = useState(''); // Handle current input for actor name
    
      // Function to handle input change for all other fields
      const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      // Add actor name to actors array on Enter
      const handleActorKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (inputValue.trim()) {
            setFormData({
              ...formData,
              actors: [...formData.actors, inputValue.trim()]
            });
            setInputValue(''); // Clear input after adding actor
          }
        }
      };
    
      // Remove actor from the list
      const removeActor = (actorToRemove) => {
        setFormData({
          ...formData,
          actors: formData.actors.filter(actor => actor !== actorToRemove)
        });
      };


      const [movieAdded, setMovieAdded] = useState(false);
      const dispatch = useDispatch();
      const handleSubmit = async (e) => {
        e.preventDefault();  

        if (formData.title && formData.releaseDate && formData.description) {
            try {

                // Dispatch the async action and wait for the response
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const data = {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Sending the token in Authorization header
                  },
                  body:formData,

                }
                const response = await dispatch(addMovieInServer(data));
                console.log('Response:', response);
                setMovieAdded(true);
                setFormData({
                  title: '',
                  releaseDate: '',
                  actors: [],  // Array to store actor names
                  posterUrl: '',
                  featured: false,
                  description: ''
                });
              
            } catch (error) {
                console.error('Error during movie addition:', error);
            }
        } else {
            // Display an alert if required fields are missing
            alert('Please fill out all required fields');
        }
    };
    

 

    return(
        <div className="bg-[#242530]  flex flex-col md:flex-row gap-24 items-center sm:px-10 py-2">
                <div className="w-[50%] rounded-md" >
                    <img src="https://www.shutterstock.com/image-photo/woman-holding-smartphone-buying-movie-600nw-2156185629.jpg" loading="lazy" alt="image" className="w-full h-full rounded-md shadow" />
                </div>
                <div className="w-full md:w-[50%]  px-4  shadow flex flex-col items-center" data-aos="zoom-in">

                        <form className="flex flex-col w-full" onSubmit={handleSubmit}>

                        <label htmlFor="title" className="text-white text-xl font-semibold">Title:</label>
                            <input type="text" placeholder="Enter Title of  Movie" className=" px-8 py-2 rounded-md mb-6 mt-2 border-2  focus:outline-none text-white font-semibold border-[#3a3c4d] bg-transparent"
                            name="title"
                            value={formData.title}
                            onChange={handleOnchange}
                            required
                        
                            />


                            <label htmlFor="releaseDate"  className="text-white text-xl font-semibold">Release date:</label>
                            <input
                                type="date"
                                className={`appearance-none px-8 py-2 rounded-md mb-6 mt-2 border-2 focus:outline-none font-semibold border-[#3a3c4d] bg-transparent w-full ${
                                formData.releaseDate ? 'text-white' : 'text-gray-400'
                                }`}
                                required
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleOnchange}
                                max={new Date().toISOString().split('T')[0]} // Max date set to today
                                style={{
                                    colorScheme: "dark", // Adjust colors for the native date picker UI (some browsers)
                                  }}
                                
                            />

                                <label htmlFor="actors" className="text-white text-xl font-semibold">Actors:</label>
                                    <div>
                                        <input
                                            type="text"
                                            className=" mt-2 mb-6 px-8 py-2 rounded-md border-2 focus:outline-none border-[#3a3c4d] text-white font-semibold bg-transparent w-full" 
                                            placeholder="Enter actors names..."
                                            required
                                            name="actors"
                                            value={inputValue}
                                          onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleActorKeyDown}
                                          />

                                        {formData.actors.map((actor, index) => (
                                            <div
                                            key={index}
                                            className="bg-[#3a3b4d] inline-block w-fit rounded-full px-6 py-2 text-sm font-medium text-white items-center m-1"
                                            >
                                            {actor}
                                            <span
                                                className="ml-2 cursor-pointer text-red-500 font-semibold"
                                                onClick={() =>removeActor(actor)}
                                            >
                                                ✕
                                            </span>
                                            </div>
                                        ))}
                                    </div>


                               <label htmlFor="posterUrl" className="text-white text-xl font-semibold">Poster url:</label>
                            <input type="url" placeholder="https://www.example.com" className=" mt-2 mb-6 px-8 py-2 rounded-md border-2 focus:outline-none border-[#3a3c4d] text-white font-semibold bg-transparent" 
                            name="posterUrl"
                            required
                            value={formData.posterUrl}
                            onChange={handleOnchange}
                            />
                           <label htmlFor="featured" className="text-white text-xl font-semibold">Featured:</label>
                            <select
                            name="featured"
                            placeholder="Select option"
                            className="mt-1 px-8 py-2 rounded-md border-2 focus:outline-none border-[#3a3c4d] text-white font-semibold bg-transparent"
                            required
                            value={formData.featured}  // Bind the form value to this select
                            onChange={handleOnchange}  // Convert string to boolean
                            >
                            <option value={true} className="bg-[#3a3c4d] text-white">Yes</option>
                            <option value={false} className="bg-[#3a3c4d] text-white">No</option>
                            </select>
                            
                            <label htmlFor="featured" className="text-white text-xl font-semibold">Description:</label>
                            <textarea name="description" id="" placeholder="Write About Movie"   className="mt-1 px-8 py-2 rounded-md border-2 focus:outline-none border-[#3a3c4d] text-white font-semibold bg-transparent"
                            required
                            value={formData.description}
                            onChange={handleOnchange}></textarea>

                       
                          <input  type="submit" value="Add Movie" className="px-6 md:px-16 mx-auto  py-2 text-white bg-transparent rounded-md border-4 hover:scale-110 transition-all duration-200 border-[#3a3b4d] mt-4"/>
                              
                        </form>
                     
                        <p className={`${addMovie === true ? "block" :"hidden"} text-green-500 text-center text-2xl mt-6 font-bold`}>Movie Added successfully</p>

                </div>
        </div>
    )
}
export default AddMovie;
