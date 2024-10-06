import React, { useState } from 'react';
import { FaChair } from 'react-icons/fa'; // Importing chair icon from react-icons
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SeatSelection = ({ objSeat, className }) => {
  const { dateTime, price, setPrice, selectedSeats, setSelectedSeats } = objSeat;

  const AllBookings = useSelector((state) => state.booking.bookings);

  let utcDate = new Date(dateTime).toISOString();
  const { id } = useParams();
  const bookings = AllBookings.filter((booking) => booking.movie === id && booking.date === utcDate);

  const totalSeats = 50; // 50 seats in total
  const seatsPerRow = 10;
  const premiumSeats = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // Example of premium seats

  const handleSeatSelect = (seatIndex) => {
    if (selectedSeats.includes(seatIndex)) {
      // Deselect the seat
      setSelectedSeats([]);
      setPrice(0);
    } else {
      // Select the seat
      setSelectedSeats([seatIndex]);
      setPrice(premiumSeats.includes(seatIndex) ? 200 : 150);
    }
  };

  const renderSeat = (index) => {
    const isPremium = premiumSeats.includes(index);
    const isSelected = selectedSeats.includes(index);

    let bgColor = isPremium ? '#ffcc00' : '#3a3b4d'; // Premium seats in gold, regular in gray
    if (isSelected) bgColor = '#00FF00'; // Selected seat in green

    const booked = bookings.some((booking) => booking.seatNumber == index + 1);
    const isDisabled = selectedSeats.length > 0 && !isSelected; // Disable other seats when one is selected

    return (
      <div
        key={index}
        disabled={booked || isDisabled}
        onClick={() => !isDisabled && handleSeatSelect(index)} // Prevent click on disabled seats
        className={`seat ${booked ? 'booked opacity-30' : 'available'} flex justify-center items-center cursor-pointer`}
        style={{
          width: '50px',
          height: '50px',
          margin: '5px',
          backgroundColor: bgColor,
          borderRadius: '5px',
          color: 'white',
          pointerEvents: booked || isDisabled ? 'none' : 'auto', // Disable pointer events for booked/other seats
          opacity: isDisabled || booked ? 0.3 : 1, // Reduce opacity for booked or disabled seats
          cursor: booked || isDisabled ? 'not-allowed' : 'pointer',
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
      <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-10 gap-4 justify-center">
        {Array.from({ length: totalSeats }).map((_, index) => renderSeat(index))}
      </div>

      {/* Selected Seats Info */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-white">Selected Seat:</h2>
        <p className="text-white">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seat selected'}</p>
      </div>
    </div>
  );
};

export default SeatSelection;
