// PublicRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.userSlice.user);
  const location = useLocation();

  return user?._id ? <Navigate to={location.state?.from || "/"} /> : children;
};

export default PublicRoute;
