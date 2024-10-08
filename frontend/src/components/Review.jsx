import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from 'aos'
const Review = ({userLogin}) => {
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    Aos.init({duration:1000})
  })

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const response = await axios.get("https://movie-ticket-booking-backend-7y20.onrender.com/review/getallreview");
        setReviews(response.data.response);
      } catch (error) {
        console.log("Error getting all reviews", error);
      }
    };
    getAllReviews();
  }, []);

  // Helper to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-400"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-[#242530] my-10 relative overflow-hidden">
      <div className="gap-8 flex mx-auto flex-col justify-center items-center w-[90%] text-white" data-aos="zoom-in">
        <h1 className="text-2xl font-semibold">Reviews</h1>

        {/* Review Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex whitespace-nowrap animate-slide-loop" // Add animation class
            style={{ width: reviews.length * 400 * 2 }} // Adjust based on the number of reviews
          >
            {/* Duplicate reviews for infinite scroll effect */}
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={index}
                className="w-[400px] flex-shrink-0 flex flex-col bg-[#3a3b4d] shadow-lg rounded-lg m-4 p-5 overflow-hidden"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={review.img || "https://via.placeholder.com/40"}
                    className="bg-white w-10 h-10 rounded-full mb-2"
                    alt="Reviewer"
                  />
                  <div>
                    <h2 className="text-white font-bold mt-1">Krishna</h2>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <h2 className="text-white opacity-80 line-clamp-3 overflow-hidden">
                  {review.reviewText}
                </h2>
              </div>
            ))}
          </div>

          {/* Blur effect for both sides */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#242530] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#242530] to-transparent pointer-events-none"></div>
        </div>

        <Link to="/addreview" className={`${userLogin ? "block" :"hidden"} hover:scale-110 transition-all duration-200 px-6 py-2 font-semibold bg-transparent border-[#3a3b4d] border-4 mt-6 `}>
          Add Review
        </Link>
      </div>
    </div>
  );
};

export default Review;
