import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
     <nav className="w-full bg-white text-black shadow-2xl px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold"><img  src={logo} alt="logo" className={"h-12"} /></div>
      <ul className="flex space-x-6">
        <li>
          <a href="/konto" className="hover:text-gray-300">
            Moje konto
          </a>
        </li>
        <li>
          <button
            onClick={() => console.log("Wyloguj kliknięte")}
            className="hover:text-gray-300"
          >
            Wyloguj
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
