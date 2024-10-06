import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Btn from "./reusable-component/Button";
import Aos from "aos";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const MovieDescription = () => {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const movies = useSelector((state) => state.movie.movies);
    const { id } = useParams();
    const movie = movies.find(movie => movie._id === id);

    const [user, setUser] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken.user);
        }
    }, []);
    console.log(user);

    if (!movie) {
        return <p>Loading...</p>;} // Or handle error

    return (
        <div className="min-h-screen w-[100vw] bg-gradient-to-r from-[#0a0d1c] to-[#2c3e50] flex flex-col md:flex-row gap-10 p-10 items-center justify-center">
            <div className="w-[90%] md:w-[50%] h-[300px] sm:h-[500px] lg:p-10 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00aaff66]" data-aos="zoom-in">
                <img src={movie.posterUrl} loading="lazy" alt="image" className="w-full h-full object-contain sm:object-cover  rounded-md shadow-lg shadow-gray-600" />
            </div>
            <div data-aos="zoom-in" className="w-[90%] md:w-[50%] xl:p-32 flex flex-col justify-center text-[#e9edf5]">
                <h2 className="text-4xl my-2 font-bold text-[#00bcd4] tracking-wider">{movie.title}</h2>
                <p className="text-sm text-[#b0bec5] mb-6">Release Date: {new Date(movie.releaseDate).toDateString()}</p>
                <p className="text-[#cfd8dc] text-md my-1 leading-relaxed">{movie.description}</p>

                <div className="flex flex-wrap mt-4">
                    <h3 className="text-[#e0f7fa] text-lg font-semibold mb-2">Actors:</h3>
                    {movie.actors.map((actor, index) => (
                        <p className="m-2 text-sm font-semibold text-[#81d4fa]" key={index}>{actor}</p>
                    ))}
                </div>

                <Btn linkto={`/${movie._id}/details`} className={`${user === "admin" || user === "" ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:scale-110"} hover:scale-110 transition-all duration-300 mx-0 w-[50%] mt-10 bg-gradient-to-r from-[#00bfa5] to-[#3498db] hover:shadow-lg hover:shadow-[#2ecc7155] text-white py-2 rounded-md`}>
                    Book Now
                </Btn>
            </div>
        </div>
    );
};

export default MovieDescription;
