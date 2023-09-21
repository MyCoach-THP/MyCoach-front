import React from "react";
import { useNavigate } from "react-router-dom";


function Cancel() {
    const navigate = useNavigate();

    const goToCart = () => {
      navigate("/shoppingcart");
    };
  
  return (
    <div className='background-style'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Le paiement a été annulé</h1>
        <div className='flex justify-center my-4 '>
          <button
            onClick={goToCart}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Retour au Panier
          </button>
        </div>
      </div>
    </div>
  );
}


export default Cancel;
