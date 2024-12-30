import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import Logout from "../pages/Logout";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-sky-900 text-white px-4 py-3 shadow-md">
      <ul className="flex flex-row-reverse items-center">
        <li className="relative">
          <button
            className="w-10 h-10 bg-gray-200 text-black rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleDropdown}
          >
          <CiUser  className="text-2xl"/>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-10">
              <ul>
                <li>
                  <Link
                    to="/OnBoard/users"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <div className="block px-4 py-2">    <Logout /></div>
      

                          </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
