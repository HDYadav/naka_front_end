import React from "react";
import { Outlet,Route, Navigate } from "react-router-dom";
import useRequireAuth from "./useRequireAuth"; 

const ProtectedRoute = () => { 
  const user = useRequireAuth(); 

    return(
        user ? <Outlet/> : <Navigate to="/"/>
    )
  };


export default ProtectedRoute;
