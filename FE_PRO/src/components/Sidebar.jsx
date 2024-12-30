import React from "react";
import { Link } from "react-router-dom";
import Logout from "../pages/Logout";
import { HiChartPie, HiUser, HiShoppingBag } from "react-icons/hi"; 
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white p-5 shadow-md">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-semibold text-center text-white">Admin Panel</h2>
      </div>

      <ul className="flex flex-col space-y-4">
        <li>
          <Link
            to="/OnBoard/dashboard"
            className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <HiChartPie className="mr-3 text-xl" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/OnBoard/users"
            className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <HiUser className="mr-3 text-3xl" />
            Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/OnBoard/products"
            className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <HiShoppingBag className="mr-3 text-3xl" />
            Manage Products
          </Link>
        </li>
        <li>
          <div className="flex flex-row items-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors ">
        <CiLogout  className="mr-3 text-3xl"/>
          <Logout /></div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
