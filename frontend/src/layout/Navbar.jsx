import React from "react";
import logo from "../assets/logo.png";
import { LogOut, User } from "lucide-react";
const Navbar = () => {
  return (
      <div className="w-full bg-white shadow-2xl ">
    <nav className="text-black px-24 flex justify-between items-center mx-auto container">
      <div className="text-lg font-semibold">
        <img src={logo} alt="logo" className={"h-12 aspect-[16/9]"} />
      </div>
      <ul className="flex space-x-6">
        <li>
          <a
            href="/"
            className="flex justify-center items-center text-gray-700 hover:font-bold font-medium"
          >
           <User className="w-6 h-6 text-gray-700"/> Moje konto
          </a>
        </li>
        <li>
          <a
            href="/"
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
