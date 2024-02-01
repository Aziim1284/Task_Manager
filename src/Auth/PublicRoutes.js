import React from 'react';
import {Navigate, Outlet,useLocation,useNavigate } from 'react-router-dom';
const PublicRoutes = ({children}) => {
  const isAuth = localStorage.getItem("loginUser");
  const navigate = useNavigate();
  let location = useLocation();
  console.log("public routes 0");
  if(isAuth){
  console.log("public routes22");

  return <Navigate to="/dashboard" state={{ from: location}} replace />
  }
  
  return children || <Outlet/>
};

export default PublicRoutes;