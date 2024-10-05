import { Link } from "react-router-dom";

const Btn = ({children,linkto,className,onClick})=>{
    return(
        <Link to={linkto} onClick={onClick} className={`px-6 md:px-16 mx-auto  py-2 text-white bg-transparent rounded-md 
        border-4 hover:scale-110 transition-all duration-200
        border-[#3a3c4d] ${className}`}>{children}</Link>
    )
}
export default Btn;