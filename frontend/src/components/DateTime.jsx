import React, { useState } from 'react';
import Btn from './reusable-component/Button';

const ShowDateTimeSelector = ({className,objDateTime}) => {
  // State to store selected date and time slot
  const {dateTimeObject,setDateTimeObject,setArrowClick} = objDateTime;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');


  // List of predefined time slots
  const timeSlots = [
    { label: '10:00 AM - 12:00 PM', value: '10:00' },
    { label: '12:00 PM - 2:00 PM', value: '12:00' },
    { label: '2:00 PM - 4:00 PM', value: '14:00' },
    { label: '4:00 PM - 6:00 PM', value: '16:00' },
    { label: '6:00 PM - 8:00 PM', value: '18:00' },
    { label: '8:00 PM - 10:00 PM', value: '20:00' },
  ];

  // Handle form submission or selection
  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert selected date and time slot to a Date object
    if (selectedDate && selectedTimeSlot) {
      const dateTime = new Date(`${selectedDate}T${selectedTimeSlot}:00`);
      setDateTimeObject(dateTime);
      console.log("Selected Date and Time as Date Object:", dateTime);
     setArrowClick(true);
      
      // Add logic here to save or use the dateTime in your app
    }

    
  };

  return (
    <div className={` w-[90vw] mx-auto p-5 py-20 md:p-20 bg-[#3a3b4d]  rounded-md  ${className}`}>
      <h1 className="text-center text-2xl font-bold mb-4 text-white">Select Show Date and Time</h1>
      
      <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col items-center space-x-4">
        {/* Date Input */}
        <div>
          <label htmlFor="show-date" className="block text-lg font-semibold mb-2 text-white">Select Date:</label>
          <input
            type="date"
            id="show-date"
            min={new Date().toISOString().split('T')[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value) }
            onBlur={handleSubmit}
            className="p-2 px-4 border-2 text-[#948382] border-[#2a2b36] bg-transparent rounded-md"
            required
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label htmlFor="show-time-slot" className="block text-lg font-semibold mb-2 text-white">Select Time Slot:</label>
          <select
            id="show-time-slot"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            onBlur={handleSubmit}
            className="p-2 px-4 border-2 border-[#242530] bg-transparent text-[#948382] rounded-md"
            required
          >
            <option value="" disabled>Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot.value}>{slot.label}</option>
            ))}
          </select>
        </div>
      </form>

      {/* Show selected date and time */}
      {dateTimeObject && (
        <div className="mt-4 text-center text-white">
          <h2 className="text-xl font-semibold">Selected Date and Time:</h2>
          <p>{dateTimeObject.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default ShowDateTimeSelector;
