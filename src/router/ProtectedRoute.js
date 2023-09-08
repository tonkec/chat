import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  return isLoggedIn && isVerified !== 'initial' && isVerified ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;
