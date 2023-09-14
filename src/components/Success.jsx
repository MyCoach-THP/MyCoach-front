import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (

    <div className='background-style'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Le paiement est réussi!</h1>
        {/* Your additional logic here */}
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
}

export default Success;
