import React from "react";
import logo from "../assets/logo.png";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMobileMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-md">
      <nav className="text-black px-4 md:px-24 py-3 flex justify-between items-center mx-auto container">
        <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/volunteer')}>
          <img src={logo} alt="logo" className="h-10 md:h-14 aspect-[16/9] hover:opacity-80 transition-opacity duration-200" />
        </div>
        <ul className="flex space-x-3 md:space-x-6">
          <li className="hidden sm:block">
            <a
              href="/Volunteer"
              className="flex justify-center items-center text-gray-700 hover:font-bold font-medium text-sm md:text-base"
            >
              <User className="w-5 h-5 md:w-6 md:h-6 text-gray-700 mr-1" />
              <span className="hidden md:inline">Moje konto</span>
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="flex justify-center items-center text-gray-700 hover:font-bold font-medium text-sm md:text-base"
            >
              <LogOut className="w-5 h-5 md:w-6 md:h-6 text-gray-700 mr-1" />
              <span className="hidden md:inline">Wyloguj</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
