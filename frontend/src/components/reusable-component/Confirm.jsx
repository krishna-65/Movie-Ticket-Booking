import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupModal = ({ isOpen, onClose, message }) => {

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
      <div className="fixed inset-0 flex items-center justify-center rounded-md">
        <div className="bg-[#242530] p-6 text-gray-100 rounded shadow-lg relative w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {message}
          </h2>
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
