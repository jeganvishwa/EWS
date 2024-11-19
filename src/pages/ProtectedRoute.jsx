import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth(); 

  // If not logged in, redirect to the home page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
