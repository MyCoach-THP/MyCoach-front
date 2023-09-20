// NotFoundPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom"; 

const NotFoundPage = () => {
  const navigate = useNavigate(); // initialize useNavigate

  const goToHome = () => {
    // define goToHome function
    navigate("/"); // navigate to home page
  };
  return (
    <div className='background-style'>
      <div className='coachform'>
        <h1 className='text-5xl font-bold text-center'>404</h1>
        <p className='text-2xl mt-4 text-center'>Page Not Found</p>
        <p className='mt-4 text-center'>Page inexistante</p>
        <div className='flex justify-center my-4 '>
          <button
            onClick={goToHome}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
