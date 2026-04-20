import React from "react";
import { Navigate, Outlet } from 'react-router';


const Protected = ({ isAuthenticated, isLoading }) => {
  // FIX: wait for auth check to finish before deciding to redirect
  if (isLoading) return null; // or replace with a spinner if you prefer

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


export default Protected;