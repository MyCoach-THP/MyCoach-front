import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedPlanAtom, purchasedItemsAtom } from "./cartAtom";
import { authAtom } from "./authAtom";
import { API_BASE_URL } from "../../config";

function Success() {
  const navigate = useNavigate();
  const [authState] = useAtom(authAtom);
  const { token } = authState;
  const [selectedPlan] = useAtom(selectedPlanAtom);
  const [purchasedItems, setPurchasedItems] = useAtom(purchasedItemsAtom);
  const { id, price } = selectedPlan;

  const sendPurchaseToBackend = async () => {
    console.log("Purchased Items in Success Component: ", purchasedItems);

    try {
      for (const item of purchasedItems) {
        const response = await fetch(`${API_BASE_URL}/purchase_histories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: authState.user_id,
            training_plan_id: item.id,
            price: item.price,
          }),
        });

        if (response.ok) {
          console.log("Successfully updated a purchase history.");
        } else {
          console.log("Failed to update a purchase history.");
        }
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  // Call sendPurchaseToBackend when the component mounts
  useEffect(() => {
    if (purchasedItems && purchasedItems.length > 0) {
      sendPurchaseToBackend();
    }
  }, [purchasedItems, token, authState.user_id]);

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className='background-style'>
      <div className='coachform'>
        <h1 className='text-2xl mb-4 text-center'>Le paiement est réussi!</h1>
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
