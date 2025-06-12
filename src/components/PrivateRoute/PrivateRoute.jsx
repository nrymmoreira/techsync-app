import React from 'react';
import { Navigate } from 'react-router-dom';

// For now, we'll simulate authentication with localStorage
// In a real app, this would check actual authentication state
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('techsync-authenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;