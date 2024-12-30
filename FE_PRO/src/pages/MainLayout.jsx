import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; 
import { Outlet } from "react-router-dom";
const OnBoard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
