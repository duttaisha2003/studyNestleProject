import React from "react";
import { Navigate, Outlet } from 'react-router';

<<<<<<< HEAD
const Protected = ({ isAuthenticated }) => {
=======
const Protected = ({ isAuthenticated, isLoading }) => {
  // FIX: wait for auth check to finish before deciding to redirect
  if (isLoading) return null; // or replace with a spinner if you prefer
>>>>>>> 2c060a1 (Final  commit)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};


export default Protected;