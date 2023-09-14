import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import { cartAtom } from "./cartAtom";

const AllTrainingPlans = () => {
  const [allPlans, setAllPlans] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [authState] = useAtom(authAtom);
  const user_id = authState.user_id;
  const [cart, setCart] = useAtom(cartAtom);
  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  fetch(`${API_BASE_URL}/training_plans/`)
    .then((response) => response.json())
    .then((data) => {
      const coachIds = data.map((plan) => plan.coach_id);

      Promise.all(
        coachIds.map((id) =>
          fetch(`${API_BASE_URL}/coaches/${id}`).then((response) =>
            response.json()
          )
        )
      )
        .then((coachDataArray) => {
          const plansWithCoachNames = data.map((plan, index) => {
            return {
              ...plan,
              firstname: coachDataArray[index].firstname || "Inconnu",
            };
          });

          setAllPlans(plansWithCoachNames);
        })
        .catch((error) => {
          console.error(
            "Il y a eu une erreur lors de la récupération des données des coaches:",
            error
          );
        });
    })
    .catch((error) => {
      console.error(
        "Il y a eu une erreur lors de la récupération des plans d'entraînement:",
        error
      );
    });
    }, []);

    const handleClickPlan = (plan) => {
      setSelectedPlan(plan);
      setShowPlan(true);
    };

    const handleClosePlan = () => {
      setShowPlan(false);
    };
  
    const centerPopupStyle = {
      top: "20%",
      left: "35%",
      transform: "translate(-50%, -50%)",
    };
  
  const handleAddToCartClick = () => {
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
      navigate("/signin");
    }
  };


return (
  <div className='background-style pt-16'>
    {" "}
    {/* Ajout d'une marge en haut */}
    <div className='all-training-plans mx-auto w-1/2'>
      {" "}
      {/* Centrage et largeur */}
      <h2 className='text-2xl mt-8 mb-4 text-center text-white'>
        Tous les plans d'entraînement
      </h2>
      {allPlans.length === 0 ? (
        <p className='text-center'>Chargement...</p>
      ) : (
        <table className='min-w-full bg-white mx-auto'>
          {" "}
          {/* Centrage du tableau */}
          <thead>
            <tr>
              <th className='w-2/5 py-2'>Titre</th>
              <th className='w-3/10 py-2'>Nom du Coach</th>
              <th className='w-1/20 py-2'>Prix</th>
            </tr>
          </thead>
          <tbody>
            {allPlans.map((plan) => (
              <tr
                key={plan.id}
                className='text-center border-b border-gray-200'>
                <td>
                  <button
                    onClick={() => handleClickPlan(plan)}
                    className='item-selection'>
                    {plan.name}
                  </button>
                </td>
                <td>{plan.firstname}</td>
                <td>{plan.price}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showPlan && (
        <div
          className='popup-plan bg-white rounded p-4 mx-auto w-1/2'
          style={centerPopupStyle}>
          {" "}
          <span className='popup-plan-close' onClick={handleClosePlan}>X</span>
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
          <button className='button-add-cart' onClick={handleAddToCartClick}> Ajouter au panier</button>
        </div>
      )}
    </div>
  </div>
);



};

export default AllTrainingPlans;
