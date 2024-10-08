import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const QRCodeGenerator = () => {
   
      const [text, setText] = useState({});
      const { id } = useParams();
      const bookings = useSelector((state) => state.booking.userBooking);
      const qrRef = useRef();
    
      // Find the correct booking based on the id
      const booking = bookings.find((booking) => booking._id === id);
    
      useEffect(() => {
        if (booking) {
          const date = new Date(booking.date).toLocaleDateString();
          const hour = new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          
          // Creating the object with booking details
          const obj = {
            BookingId: booking._id,
            movieId: booking.movieId,
            userId: booking.userId,
            seat: booking.seatNumber,
            date: date,
            time: hour
          };
    
          // Setting the text state with the booking details
          setText(obj);
        }
      }, [booking]); // Dependency array ensures useEffect only runs when booking changes
    
      
   
  //Function to handle downloading the QR code
  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ticket.png';
    link.click();
  };

  return (
    <div className="flex flex-col bg-[#242530] items-center justify-center h-screen">
      
      <div ref={qrRef} className="mb-4">
        {text && (
          <QRCodeCanvas
            value={text}
            size={256} // Adjust size as needed
            bgColor="#ffffff"
            fgColor="#000000"
            className='rounded-md shadow'
          />
        )}
      </div>
      
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white p-2 px-10 mt-10  rounded-md shadow hover:scale-110 transition-all duration-200"
        disabled={!text} // Disable button if no text is entered
      >
        Download 
      </button>
    </div>
  );
};

export default QRCodeGenerator;
