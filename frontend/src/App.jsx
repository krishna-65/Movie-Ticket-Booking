import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMovie from "./pages/AddMovie";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import ProtectedRoute from "./components/ProtectedComponent";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import MovieDescription from "./components/Movie-description";
import OTPInput from "./components/OTP_Verification";


const App = ()=>{

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;  // Current time in seconds
      
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            navigate('/login');  // Redirect to login if token expired
          }
        }
       
      }, [navigate]);

      useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          navigate(`/dashboard/${decodedToken.id}`);  // Redirect to dashboard if token exists
        }
        else{
          navigate('/')
        }
      },[])

      
    return(
           <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard/:id" element={
            <ProtectedRoute>
                        <Dashboard/>
            </ProtectedRoute>}/>
            <Route path="/:id/description" element={<MovieDescription/>} />
            <Route path="/addmovie" element={<AddMovie/>} />
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="/:id/details" element={<Details/>}/>
            <Route path="/otpverify" element={<OTPInput/>}/>
           </Routes>
    )
}
export default App;