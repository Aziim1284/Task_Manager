import React from 'react';
import {Navigate, Outlet,useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import { Routes , Route } from 'react-router-dom';
const PrivateRoute = () => {
  const isAuth = localStorage.getItem("loginUser");
  const navigate = useNavigate();
  
  return (
    isAuth ? <Home /> : <Navigate to="/login" replace />
  );
};

export default PrivateRoute;