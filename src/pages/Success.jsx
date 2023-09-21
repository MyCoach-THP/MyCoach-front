import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  selectedPlanAtom,
  purchasedItemsAtom,
  cartAtom,
} from "../atoms/cartAtom";
import { authAtom } from "../atoms/authAtom";
import { API_BASE_URL } from "../../config";

function Success() {
  const navigate = useNavigate();
  const [authState] = useAtom(authAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [selectedPlan] = useAtom(selectedPlanAtom);
  const [purchasedItems, setPurchasedItems] = useAtom(purchasedItemsAtom);
  const token = authState.token;

  const checkPaymentStatus = async () => {
    try {
      if (!token) {
        console.log("Token is not available");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/payment/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();

      if (!text.startsWith("{")) {
        console.error(`Invalid JSON received: ${text}`);
        return;
      }

      const data = JSON.parse(text);

    } catch (error) {
      console.error("Failed to check payment status:", error);
    }
  };

  const sendPurchaseToBackend = async (cartList) => {
    if (!token || !authState.user_id) {
      console.log("Token or User ID is missing");
      return;
    }
    try {
      for (const item of cartList) {
        console.log("Data being sent:", {
          user_id: authState.user_id,
          training_plan_id: item,
        });

        const response = await fetch(`${API_BASE_URL}/purchase_histories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: authState.user_id,
            training_plan_id: item,
          }),
        });

        if (response.ok) {
          console.log("Successfully updated a purchase history.");
        } else {
          console.log("Failed to update a purchase history.");
          const errorData = await response.json();
          console.log("Error data received:", errorData);
        }
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  useEffect(() => {
    if (cart && cart.cartlist && cart.cartlist.length > 0) {
      setPurchasedItems([...cart.cartlist]);
      sendPurchaseToBackend(cart.cartlist);
      setCart({ cartlist: [] });
    }
  }, [cart]);

  useEffect(() => {
    if (purchasedItems && purchasedItems.length > 0) {
      sendPurchaseToBackend();
    }
  }, [purchasedItems, authState.user_id, authState.token]);

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
