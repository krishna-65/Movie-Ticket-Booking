import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupModal = ({ isOpen, onClose, message,removeBooking,show }) => {

    const navigate = useNavigate();

  if (!isOpen) return null; 
  return (
    <>
      <div
        className="fixed inset-0 bg-[#242530] bg-opacity-50 backdrop-blur-md"
        onClick={()=>{ onClose(false); 
            navigate("/");
        }} 
      />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center  rounded-md">
        <div className="bg-[#242530] p-6 text-gray-100 rounded shadow-lg relative w-[90%] sm:w-1/3 ">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {message}
          </h2>
          <div className={`${show === true ? "flex" : "hidden"} flex-col sm:flex-row justify-center gap-4 sm:gap-8`}>
            <button className="px-6 py-2  hover:scale-110 hover:font-bold transition-all duration-200 bg-green-700 rounded-md shadow  text-md font-semibold" onClick={()=>removeBooking()}>
              OK
            </button>
            <button className="px-6 py-2 hover:scale-110 hover:font-bold transition-all duration-200  text-center rounded-md shadow  bg-red-400 text-md font-semibold" onClick={()=>{
                onClose(false);
                navigate("/dashboard");
            }}>
              Cancel
            </button>
          </div>
          <button
            className="absolute top-1 right-4 text-gray-100  hover:text-white text-2xl font-bold"
            onClick={()=>{
                onClose(false);
                navigate("/dashboard");
            }}
          >
             X
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
