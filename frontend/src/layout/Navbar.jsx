import React from "react";
import logo from "../assets/logo.png";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
      <div className="w-full bg-white shadow-md">
  <nav className="text-black px-24 py-3 flex justify-between items-center mx-auto container">
    <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/volunteer')}>
      <img src={logo} alt="logo" className="h-14 aspect-[16/9] hover:opacity-80 transition-opacity duration-200" />
    </div>
    <ul className="flex space-x-6">
      <li>
        <a
          href="/Volunteer"
          className="flex justify-center items-center text-gray-700 hover:font-bold font-medium"
        >
          <User className="w-6 h-6 text-gray-700" /> Moje konto
        </a>
      </li>
      <li>
        <a
          href="/login"
          className="flex justify-center items-center text-gray-700 hover:font-bold font-medium"
        >
          <LogOut className="w-6 h-6 text-gray-700" /> Wyloguj
        </a>
      </li>
    </ul>
  </nav>
</div>


  );
};

export default Navbar;
