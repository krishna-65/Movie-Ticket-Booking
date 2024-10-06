
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Movies from "../components/Movies";
import Navbar from "../components/Navbar";
import { getAllBookings_from_server } from "../store/reducers/Booking-Reducer";

const Home = ()=>{

  const [userLogin,setUSerLogin] = useState(false);

  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        setUSerLogin(true);
      }
    
  },[])

    
    return (
      <div className={`bg-[#242530] ${userLogin?"pt-0":"pt-5"} pb-5`}>
        <section className={`${userLogin?"hidden":"block"}`}>
               <Navbar/>
        </section>
        <section id="home">
            <Hero/> 
        </section>
        <section id="movies">
            <Movies/>
        </section>
      <section id="about">
          <Footer/>
      </section>
    
      </div>
    )
}
export default Home;