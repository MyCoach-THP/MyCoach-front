import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../assets/logo.svg";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [authState, setAuthState] = useAtom(authAtom);
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

  return (
    <nav className='bg-black bg-opacity-50 p-4 fixed w-full z-10 shadow-md'>
      <div className='flex justify-between items-center'>
        {/* Logo à gauche */}
        <Link to='/' className='flex items-center'>
          <img src={logoSvg} alt='Logo' className='w-20 h-20 -mt-6 -mb-6' />
        </Link>
        {/* Liens à droite */}
        <ul className='flex space-x-4'>
          {isLoggedIn ? (
            <>
              {isCoach === "true" ? (
                <li>
                  <Link to='/dashboard' className='nav-link'>
                    Tableau de bord
                  </Link>
                </li>
              ) : (
                <Link to='/trainings' className='nav-link'>
                  Mon profil
                </Link>
              )}
              <Link to='shoppingcart' className='nav-link'>
                Mon Panier
              </Link>
              <li>
                <button onClick={handleLogout} className='nav-link'>
                  Se déconnecter
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/register' className='nav-link'>
                  S'enregistrer
                </Link>
              </li>
              <li>
                <Link to='/signin' className='nav-link'>
                  Se connecter
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
