import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../models/RootState';
import User from '../models/User';


const ProtectedRoute = () => {
  const isLoggedIn = useSelector<RootState, User>((state) => state.authReducer.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
