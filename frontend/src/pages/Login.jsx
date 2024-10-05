import Aos from "aos";
import { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import Btn from "../components/reusable-component/Button";
import { login_In_admin_Database, login_In_user_Database } from "../store/reducers/user-reducer";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Buffer } from "buffer";
const Login = ()=>{
    const navigate = useNavigate();
    const [user,setUser] = useState("User");

    const handleUserChange = (e)=>{
          
        setUser(e.target.innerHTML);
    }

    useEffect(()=>{
        Aos.init({duration: 1000});
    })

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const handleOnchange = (e)=>{

        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const dispatch  = useDispatch();


    const handleSubmit = async(e)=>{
        e.preventDefault();
       let response ;
        try{
            if(user==="User")
                {
                     response = await dispatch(login_In_user_Database(formData));
                }
                else
                {
                    response = await dispatch(login_In_admin_Database(formData));
                }
                localStorage.setItem('token',response.token);
                const decode = jwtDecode(response.token);
                // const encodedUserId = Buffer.from(decode.id).toString('base64');
                navigate(`/dashboard/${decode.id}`,user);
          
                
        }catch(e){
            console.log("error inside login component",e);
        }
    }

    return(
        <div className="bg-[#242530] h-screen flex flex-col md:flex-row items-center sm:p-10">
                <div className="w-[50%] rounded-md" data-aos="zoom-in">
                    <img src="https://www.shutterstock.com/image-photo/woman-holding-smartphone-buying-movie-600nw-2156185629.jpg" loading="lazy" alt="image" className="w-full h-full rounded-md shadow" />
                </div>
                <div className="w-full md:w-[50%] py-24 px-4 md:p-24 shadow flex flex-col items-center" data-aos="zoom-in">

                        <div className="text-white flex gap-4 px-4 border-[#3a3c4d] border-2 rounded-full mb-4">
                                <p className={`px-6 my-1 rounded-full py-2 ${user === "User"?"bg-[#3a3c4a] font-semibold":""}`} onClick={handleUserChange}>User</p>
                                <p className={`px-6 my-1 rounded-full py-2 ${user === "Admin"?"bg-[#3a3c4a] font-semibold":""}`} onClick={handleUserChange}>Admin</p>
 
                        </div>

                        <form className="flex flex-col w-full " onSubmit={(e)=>e.preventDefault()}>

                            <label htmlFor="email" className="text-white text-xl font-semibold">Email:</label>
                            <input type="text" placeholder="Enter your email" className=" px-8 py-2 rounded-md mb-6 mt-2 border-2  focus:outline-none text-white font-semibold border-[#3a3c4d] bg-transparent"
                            name="email"
                            value={formData.email}
                            onChange={handleOnchange}/>

                            <label htmlFor="password" className="text-white text-xl font-semibold">Password:</label>
                            <input type="password" placeholder="Enter your password" className=" mt-1 px-8 py-2 rounded-md border-2 focus:outline-none border-[#3a3c4d] text-white font-semibold  bg-transparent" 
                            name="password"
                            value={formData.password}
                            onChange={handleOnchange}
                            />
                            <Btn onClick={handleSubmit} className= "mt-4 hover:scale-110 transition-all duration-200">Login</Btn>
                               <p className="mt-8 text-center text-gray-400">Don't have an account?<Link to="/register" className="m-2 text-blue-500 cursor-pointer underline">Signup</Link> </p>
                        </form>
                     


                </div>
        </div>
    )
}
export default Login;