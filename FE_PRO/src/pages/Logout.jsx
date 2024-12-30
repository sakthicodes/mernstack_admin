import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../models/authStore";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken"); 
    navigate("/login");
  };
  return (
    <button onClick={handleLogout} >
      Logout
    </button>
  );
};


export default Logout;
