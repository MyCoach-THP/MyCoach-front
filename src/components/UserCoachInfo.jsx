import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { cartAtom } from "../atoms/cartAtom";
import { useNavigate } from "react-router-dom";

const UserCoachInfo = ({ profileData, trainingPlans }) => {
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const [cart, setCart] = useAtom(cartAtom);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleClickPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlan(true);
  };

  const handleClosePlan = () => {
    setShowPlan(false);
  };

  const handleAddToCartClick = (event) => {
    event.disabled = true;
    event.textContent = "Le programme est déjà dans votre panier";
    event.className = "button-add-cart-disabled";

    if (user_id != null) {
      const token = localStorage.getItem("token");

      fetch(`${API_BASE_URL}/cart/add/?training_plan_id=${selectedPlan.id}`, {
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
      console.log("test");
      navigate("/signin");
    }
  };

  useEffect(() => {}, [cart]);

  const centerPopupStyle = {
    transform: "translate(-50%, -50%)",
    maxWidth: windowWidth <= 768 ? "90%" : "initial",
  };

  return (
    <>
      <img
        src={profileData.image_url}
        alt='User Profile Picture'
        className='profile-picture w-full sm:w-auto'
      />
      {profileData.name && (
        <div className='mb-4'>
          <strong>Nom : </strong>
          {profileData.name}
        </div>
      )}
      <div className='mb-4'>
        <strong>Prénom :</strong> {profileData.firstname}
      </div>
      <div className='mb-4'>
        <strong>Description :</strong> {profileData.description}
      </div>
      <h2 className='table-header text-lg sm:text-xl mb-4 text-center'>
        Le(s) programme(s) d'entraînement(s) que je propose:
      </h2>
      <ul className='list-decimal list-inside space-y-2 sm:space-y-4'>
        {trainingPlans.map((plan) => (
          <li
            key={plan.id}
            className='flex flex-col sm:flex-row justify-between items-center'>
            <div>
              <button
                className='item-selection px-2 '
                onClick={() => handleClickPlan(plan)}>
                {plan.name}:
              </button>
            </div>
            <div className='flex items-center mt-2 sm:mt-0'>
              <span className='bg-yellow-200 px-2 py-1 rounded-md text-yellow-800'>
                {plan.price}€
              </span>
            </div>
          </li>
        ))}
      </ul>
      {showPlan && (
        <div
          className='popup-plan bg-white rounded p-4 mx-4 sm:mx-auto w-full sm:w-1/2 '
          style={centerPopupStyle}>
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
          <button
            className={`buybutton ${
              cart.cartlist.includes(selectedPlan.id.toString())
                ? "button-add-cart-disabled md:py-4 md:px-8 py-2 px-4"
                : "button-add-cart md:py-4 md:px-8 py-2 px-4"
            }`}
            onClick={(event) => {
              if (!cart.cartlist.includes(selectedPlan.id.toString())) {
                handleAddToCartClick(event.currentTarget);
              }
            }}
            disabled={cart.cartlist.includes(selectedPlan.id.toString())}>
            {!cart.cartlist.includes(selectedPlan.id.toString())
              ? "Ajouter au panier"
              : "Le programme est déjà dans votre panier"}
          </button>
        </div>
      )}
    </>
  );
};

export default UserCoachInfo;
