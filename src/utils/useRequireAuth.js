import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

  const useRequireAuth = () => {
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Navigate("/");
    }
  }, [user, Navigate]);

 
  return user;
};

export default useRequireAuth;
