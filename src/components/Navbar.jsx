import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/signin'>Sign In</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
