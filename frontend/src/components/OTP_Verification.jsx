import React, { useState } from 'react';

const OTPInput = ({ length, onOTPChange, onSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onOTPChange(newOtp.join(""));
      
      // Automatically focus next input if valid input is entered
      if (value !== "" && index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join(""));
  };

  return (
    <div className="otp-container flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Enter OTP</h2>
      <form onSubmit={handleSubmit} className="flex space-x-3 mb-4">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="w-12 h-12 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </form>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
        onClick={handleSubmit}
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OTPInput;
