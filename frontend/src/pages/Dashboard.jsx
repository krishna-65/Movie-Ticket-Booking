import {  useNavigate } from "react-router-dom";
import Btn from "../components/reusable-component/Button";
import Aos from "aos";
import { useEffect, useState } from "react";
import Booking from "../components/Booking";
import Movies from "../components/Movies";
import Home from "./Home";
import { jwtDecode } from "jwt-decode";
import AddMovie from "./AddMovie";
import { useDispatch, useSelector } from "react-redux";
import { FaAlignCenter } from "react-icons/fa";
import AdminMovies from "../components/Admin-Movies";
import { getAllBookings_from_server } from "../store/reducers/Booking-Reducer";

const Dashboard = ()=>{

    const dispatch = useDispatch();

   useEffect(()=>{
    const getAllBookings  = async()=>{
        try{
            const response = await dispatch(getAllBookings_from_server());
        }catch(error){
            console.log("Error in getting all bookings", error);
        }
    }
    getAllBookings();
   },[])

    const navigate = useNavigate();

    useEffect(()=>{
        Aos.init({duration: 1000});
    },[])


    const [currentBtn, setCurrentBtn] = useState("Home");

    const handleBtnClick = (btn) => {
        setCurrentBtn(btn.target.innerHTML);
        setHamburgerClicked(!hamburgerClicked)
    }

    const handleSignOut = ()=>{
        const token = localStorage.getItem("token");
        if(token)
        localStorage.removeItem("token");
        
        navigate("/");

    }

    const [user, setUser] = useState(null);
    const [userName,setUserName] = useState('');
    const [hamburgerClicked, setHamburgerClicked] = useState(false);

    useEffect(()=>{
            const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken.user);
            const name = decodedToken.name;
            setUserName(name);
        }
        else{
            navigate('/');
        }
    },[])

  
    
    return (

        <>
       <div className="min-h-[100vh]  bg-[#242530] flex flex-col gap-8 p-5 ">

            <div className="relative" data-aos="zoom-in">
                    <div className="relative bg-[#3a3b4d] hover:shadow-xl hover:shadow-[#00aaff66] text-white mx-auto p-5 shadow rounded-md  w-[90%] flex justify-between items-center">
                                <FaAlignCenter onClick={()=>setHamburgerClicked(!hamburgerClicked)} className="text-2xl cursor-pointer"/>
                            <h1 data-aos="zoom-in" className="text-2xl  font-mono ml-8">Hey'<span className="text-[#daf0e0]"> {userName}<span/></span></h1>
                                <div>
                            <div data-aos="zoom-in"> <Btn onClick={handleSignOut} className="hover:scale-110 transition-all duration-200 hidden sm:block text-red-400 border-red-400" >Sign Out</Btn></div>
                            </div> 
                    </div>

                    <div className={`absolute w-[300px] right-0 transition-opacity duration-300 ease-in-out ${hamburgerClicked ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

                        <div className="h-[80vh]   p-10 flex flex-col justify-center gap-10 bg-[#2b2d38] m-5 rounded-lg text-white items-center " data-aos="zoom-in">


                                    <Btn onClick={handleBtnClick}>Home</Btn>
                                    <Btn onClick={handleBtnClick}>Movies</Btn>
                                    <Btn className={`${user === "admin"? "block": "hidden"} px-11`} onClick={handleBtnClick}>Add Movie</Btn>
                                   <Btn onClick={handleBtnClick}>Bookings</Btn>
                                   <div data-aos="zoom-in"> <Btn onClick={handleSignOut} className="hover:scale-110 transition-all duration-200  sm:hidden text-red-400 border-red-400" >Sign Out</Btn></div>
                            </div>

                        </div>


                    </div>


                         {
                            currentBtn === "Home" ? <Home /> :  
                            currentBtn === "Movies" && user === "admin" ? <AdminMovies /> : 
                            currentBtn === "Add Movie" ? <AddMovie /> : currentBtn === "Bookings"?<Booking />:""
                        }

                    <div className={`transition-all duration-300 ${hamburgerClicked ? "hidden sm:w-[75vw] md:w-[80vw] lg:w-[85vw] sm:flex justify-end" : "w-full"}`}>

                       { currentBtn === "Movies" && user === "user" ? <Movies />:"" }

                        </div>


    
            

       </div>
       </>
    )
}
export default Dashboard;