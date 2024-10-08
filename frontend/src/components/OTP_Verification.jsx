import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyAccount = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {token}  = useParams(); // Assuming the token is stored in localStorage

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        // Make a GET request to verify the token
        const response = await axios.get(`http://localhost:3001/user/verify/${token}`);

        // Check if the response is successful
        if (response.status === 200 && response.data.success) {
          setIsVerified(true);
          // Wait for 2 seconds before navigating to login page
          setTimeout(() => {
            localStorage.removeItem("verify");
            navigate('/login');
          }, 2000);
        } else {
          // If response status is not 200, handle failure case
          throw new Error("Verification failed");
        }
      } catch (err) {
        // Handle error and failed verification
        setError(err.response?.data?.message || "Verification failed");
        setIsVerified(false);

        // Remove token and navigate to signup page after 2 seconds
        setTimeout(() => {
          localStorage.removeItem("verify");
          navigate('/register'); // Navigate to signup (register) page
        }, 2000);
      }
    };

    // Call the function to verify the account
    verifyAccount();
  }, [token, navigate]);

  return (
    <div className='text-white bg-[#242530] min-h-screen flex justify-center items-center text-xl font-mono font-semibold'>
      {isVerified ? (
        <p>Verification successful! Redirecting to login...</p>
      ) : error ? (
        <p>Verification failed: {error}. Redirecting to signup...</p>
      ) : (
        <p>Verifying account...</p>
      )}
    </div>
  );
};

export default VerifyAccount;
