// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is logged in from Redux store
  const user = useSelector((state) => state.userSlice.user);

  // Redirect to login if user info is not present
  return user?._id ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
