import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import { cartAtom } from "./cartAtom";

const UserCoachInfo = ({ profileData, trainingPlans }) => {

  const [allPlans, setAllPlans] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const [cart, setCart] = useAtom(cartAtom);
  const [cartCount, setCartCount] = useState(0);

  const handleClickPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlan(true);
  };

  const handleClosePlan = () => {
    setShowPlan(false);
  };

  const handleAddToCartClick = () => {
    if (user_id != null) {
      const token = localStorage.getItem("token");

      fetch(`${API_BASE_URL}/cart/add/?product_id=${selectedPlan.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          setCart((prevCart) => ({
            ...prevCart,
            cartlist: [...prevCart.cartlist, selectedPlan.id],
          }));
          localStorage.setItem("cartlist", [...cart.cartlist, selectedPlan.id]);
        } else {
          throw new Error("Erreur lors de l'ajout au panier");
        }
      });
    } else {
      navigate("/signin");
    }
  };

  const centerPopupStyle = {
    top: "20%",
    left: "35%",
    transform: "translate(-50%, -50%)",
  };


  return (
    <>
      <img
        src={profileData.image_url}
        alt='User Profile Picture'
        className='profile-picture'
      />

      <div className='mb-4'>
        <strong>Nom :</strong> {profileData.lastname}
      </div>
      <div className='mb-4'>
        <strong>Prénom :</strong> {profileData.firstname}
      </div>
      <div className='mb-4'>
        <strong>Description :</strong> {profileData.description}
      </div>
      <h2 className='table-header text-xl mb-4 text-center'>
        Le(s) programme(s) d'entraînement(s) que je propose:
      </h2>
      <ul className='list-decimal list-inside'>
        {trainingPlans.map((plan) => (
          <p>
            <button
              key={plan.id}
              className='item-selection'
              onClick={() => handleClickPlan(plan)}>
              {" "}
              {plan.name}: {plan.price}€{" "}
            </button>
          </p>
        ))}
      </ul>

      {showPlan && (
        <div
          className='popup-plan bg-white rounded p-4 mx-auto w-1/2'
          style={centerPopupStyle}>
          {" "}
          <span className='popup-plan-close' onClick={handleClosePlan}>
            X
          </span>
          <p className='mt-5 mb-2'>
            <strong>Nom du programme : </strong>
            {selectedPlan.name}
          </p>
          <p className='mb-2'>
            <strong>Description : </strong>
            {selectedPlan.description}
          </p>
          <p className='mb-2'>
            <strong>Prix : </strong>
            {selectedPlan.price} €
          </p>
          <button className='button-add-cart' onClick={handleAddToCartClick}>
            {" "}
            Ajouter au panier{" "}
          </button>
        </div>
      )}
    </>
  );
};

export default UserCoachInfo;
