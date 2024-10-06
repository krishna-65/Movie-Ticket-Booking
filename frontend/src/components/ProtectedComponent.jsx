import { Navigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    // Check if the token has expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');  // Remove the token
      return <Navigate to="/login" />;  // Redirect to login
    }

    // Optional: Check that the user ID in the URL matches the token's userId
   let { id } = useParams();
//    id = Buffer.from(id, 'base64').toString('utf-8');
    if (id !== decodedToken.id) {
      return <Navigate to="/login" />;  // Prevent access if the IDs don't match
    }

  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');  // If the token is invalid, remove it
    return <Navigate to="/login" />;  // Redirect to login
  }

  return children;  // If token is valid, allow access to the component
};

export default ProtectedRoute;
