import React, { useState } from 'react';
import { FaChair } from 'react-icons/fa'; // Importing chair icon from react-icons
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SeatSelection = ({objSeat, className}) => {
  // State to keep track of selected 
 
     
      

const {dateTime,price,setPrice, selectedSeats, setSelectedSeats} = objSeat;


const AllBookings = useSelector((state)=>state.booking.bookings);

let utcDate = new Date(dateTime).toISOString();

const {id} =useParams();
const bookings =  AllBookings.filter(booking => (booking.movie === id && booking.date === utcDate));


    
  // Define total seats (5 rows and 10 seats per row)
  const totalSeats = 50; // 50 seats in total
  const seatsPerRow = 10;
  
  // Premium seat indexes (center seats)
  const premiumSeats = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // Example of center premium seats

  // Handle seat selection
  const handleSeatSelect = (seatIndex) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatIndex)) {
        // Deselect seat if it's already selected
        if(premiumSeats.includes(seatIndex))
            setPrice(price-200);
        else
            setPrice(price-150);
        return prevSelected.filter((seat) => seat !== seatIndex);

      } else {
        // Select the seat
        if(premiumSeats.includes(seatIndex))
            setPrice(price+200);
        else
            setPrice(price+150);

        return [...prevSelected, seatIndex];
      }
    });
  };

  // Function to render each seat with appropriate styles
  const renderSeat = (index) => {
    const isPremium = premiumSeats.includes(index);
    const isSelected = selectedSeats.includes(index);

    // Determine the background color
    let bgColor = isPremium ? '#ffcc00' : '#3a3b4d'; // Premium seats have gold color, regular seats have gray
    if (isSelected) {
      bgColor = '#00FF00'; // Selected seats have green color
    }
    
      const booked = bookings.some(booking => booking.seatNumber == index+1);
          // console.log(booked);
    return (
      <div
        key={index}
        disabled={booked} // Disable selected seats that are already booked
        onClick={() => handleSeatSelect(index)}
        className={`seat ${booked ? 'booked opacity-30' : 'available'} flex justify-center items-center cursor-pointer`}
        style={{
          width: '50px',
          height: '50px',
          margin: '5px',
          backgroundColor: bgColor,
          borderRadius: '5px',
          color: 'white',
          pointerEvents: booked ? 'none' : 'auto', 
          cursor: booked ? 'not-allowed' : 'pointer',
        }}
      >
        <FaChair size={24} />
      </div>
    );
  };

  return (
    <div className={`seat-selection p-6 ${className}`}>
      <h1 className="text-center text-2xl font-bold mb-6 text-white">Select Your Seat</h1>

      {/* Seat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-7 md:grid-cols-10 gap-4 justify-center">
        {/* Loop through total seats and render each one */}
        {Array.from({ length: totalSeats }).map((_, index) => renderSeat(index))}
      </div>

      {/* Selected Seats Info */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-white">Selected Seats:</h2>
        <p className='text-white'>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</p>
      </div>
    </div>
  );
};

export default SeatSelection;
