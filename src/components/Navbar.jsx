import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className='bg-black bg-opacity-50 p-4 fixed w-full z-10 shadow-md'>
      <div className='flex justify-between items-center'>
        {/* Logo à gauche */}
        <Link to='/' className='flex items-center'>
          <img src={logoSvg} alt='Logo' className='w-20 h-20 -mt-6 -mb-6' />
        </Link>
        {/* Liens à droite */}
        <ul className='flex space-x-4'>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to='/register' className='text-blue-500'>
                  Register
                </Link>
              </li>
              <li>
                <Link to='/signin' className='text-blue-500'>
                  Sign In
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className='text-blue-500'>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
