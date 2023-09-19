import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../assets/logo.svg";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import { API_BASE_URL } from "../../config";

const Navbar = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [authState, setAuthState] = useAtom(authAtom);
  const [isOpen, setIsOpen] = useState(false);
  const isCoach = localStorage.getItem("is_coach");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setAuthState({
      isLoggedIn: false,
      token: null,
      user_id: null,
    });
    navigate("/");
  };

  const renderLinks = () => (
    <>
      {isLoggedIn ? (
        <>
          <li className='px-4'>
            <Link to='/profile' className='nav-link' onClick={() => setIsOpen(false)}>
              Mon profil
            </Link>
          </li>
          {isCoach === "true" ? (
            <li>
              <Link to='/dashboard' className='nav-link' onClick={() => setIsOpen(false)}>
                Tableau de bord
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/shoppingcart' className='nav-link' onClick={() => setIsOpen(false)}>
                Mon Panier <span className='cartcount'>{props.cartCount}</span>
              </Link>
            </li>
          )}
          <li>
            <button onClick={handleLogout} className='nav-link'>
              Se déconnecter
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to='/register' className='nav-link' onClick={() => setIsOpen(false)}>
              S'enregistrer
            </Link>
          </li>
          <li>
            <Link to='/signin' className='nav-link' onClick={() => setIsOpen(false)}>
              Se connecter
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className='bg-black bg-opacity-50 p-4 fixed w-full z-10 shadow-md'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='flex items-center'>
          <img src={logoSvg} alt='Logo' className='w-20 h-20 -mt-6 -mb-6' />
        </Link>
        <button className='lg:hidden p-2' onClick={() => setIsOpen(!isOpen)}>
          <div className='w-8 h-1 bg-white mb-1'></div>
          <div className='w-8 h-1 bg-white mb-1'></div>
          <div className='w-8 h-1 bg-white'></div>
        </button>

        {/* Links for Desktop */}
        <ul className='hidden lg:flex space-x-4'>{renderLinks()}</ul>

        {/* Links for Mobile (Hamburger Menu) */}
        <ul
          className={`transition-all ease-out duration-300 ${
            isOpen
              ? "block absolute bg-black bg-opacity-70 text-white top-full right-0"
              : "hidden"
          } flex flex-col space-x-4 space-y-4 w-40 py-4 rounded`}>
          {renderLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
