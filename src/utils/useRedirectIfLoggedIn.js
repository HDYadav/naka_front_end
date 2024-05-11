import React, { useEffect,Outlet } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRedirectIfLoggedIn = () => {
  const user = useSelector((state) => state.user);  

  const Navigate = useNavigate();

  useEffect(() => {
    if (user) {
   
      Navigate("/dashboard");
    }
  }, [user, Navigate]);

  return user;  
};

export default useRedirectIfLoggedIn;
