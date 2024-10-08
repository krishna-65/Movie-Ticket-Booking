import React, { useState, useEffect } from 'react';
import { MdStarOutline, MdStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AddReview } from '../store/reducers/User-reducer';
import { useNavigate, useParams } from 'react-router-dom';

const Review_form = () => {

  const {id} =  useParams();

  const [rating, setRating] = useState(0); // Track the current rating
  const [formData, setFormData] = useState({
    userId:id,
    reviewText: '',
    rating: 0
  });

  // Update the formData's rating when the rating changes
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, rating }));
  }, [rating]);

  // Function to set the rating when a star is clicked
  const handleRating = (index) => {
    setRating(index + 1); // Set the rating based on the star clicked (1 to 5)
  };

  // Handle form submission
  
const navigate  = useNavigate();
  const dispatch  =useDispatch();
  const [loading,setLoading] = useState(false);
  const handleSubmit = async(e) => {
    setLoading(true); // Start loading spinner while submitting the form
    e.preventDefault();
   try{
                const response = await dispatch(AddReview(formData));
                if(response.status === 200 || response.success === true){
                  setFormData({ reviewText: '', rating: 0 });
                } 
                navigate('/dashboard');
                setLoading(false); // Stop loading spinner after form submission
   }catch(error){
    console.log("Error in Review component: ",  error)
   }
  };

  // Handle textarea change
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      reviewText: e.target.value // Update reviewText with the textarea's value
    });
  };

  return (
    <div className="h-screen bg-[#242530]  text-white flex flex-col items-center justify-center">
      <h2 className="mb-8 text-2xl opacity-90 font-mono text-center">Share Your Experience With Us</h2>

      <div className="flex gap-1 md:gap-5 my-8 ">
        {[...Array(5)].map((_, index) => (
          <div key={index} onClick={() => handleRating(index)} className="cursor-pointer p-1">
            {index < rating ? (
              <MdStar className="text-2xl sm:text-6xl text-yellow-400" /> // Filled star
            ) : (
              <MdStarOutline className="text-2xl sm:text-6xl text-white" /> // Outline star
            )}
          </div>
        ))}
      </div>

      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your experience here"
          className="bg-transparent border-4 w-[90%] border-[#3a3b4d] p-3 text-white"
          rows="4"
          cols="50"
          value={formData.reviewText}
          onChange={handleOnChange} // Update formData with the value entered in textarea
        ></textarea>

        <input
          type="submit"
          value={loading ? "Submitting..." : "Submit"}
          className={`${loading?"opacity-50 border-4 border-[#3a3b4d] pointer-events-none":""}border-4 m-1 border-[#3a3b4d] hover:scale-110 transition-all duration-200 px-8 py-2 my-8`}
        />
      </form>
    </div>
  );
};

export default Review_form;
