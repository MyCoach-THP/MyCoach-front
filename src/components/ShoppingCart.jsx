import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "./authAtom";
import { cartAtom, selectedPlanAtom, purchasedItemsAtom } from "./cartAtom";
import { API_BASE_URL } from "../../config";
import { useStripe } from "@stripe/react-stripe-js";

const ShoppingCart = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  const [, setSelectedPlan] = useAtom(selectedPlanAtom);
  const [, setPurchasedItems] = useAtom(purchasedItemsAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [cartCount, setCartCount] = useState(0);
  const [myCart, setMyCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const user_id = authState.user_id;

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/cart/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cartlist);
        setCart({ cartlist: data.cartlist });
        setCartCount(data.cartlist.length);
      })
      .catch((error) => {
        console.error("There was an error fetching cart data!", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/training_plans/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const cartlistIDs = cart.cartlist.map((id) => parseInt(id));

        const filteredTrainingPlans = data.filter((trainingPlan) =>
          cartlistIDs.includes(trainingPlan.id)
        );

        setMyCart(filteredTrainingPlans);
      })
      .catch((error) => {
        console.error("There was an error fetching training plans!", error);
      });
  }, [cart]);

  useEffect(() => {
    const newTotalPrice = myCart.reduce(
      (acc, item) => acc + parseInt(item.price),
      0
    );
    setTotalPrice(newTotalPrice);
  }, [myCart]);

  const handleDeleteFromCartClick = (itemId) => {
    if (user_id != null) {
      const token = localStorage.getItem("token");

      fetch(`${API_BASE_URL}/cart/remove/?training_plan_id=${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            getCart();
          } else {
            throw new Error("Erreur lors de la suppression du panier");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du panier :", error);
        });
    } else {
      navigate("/signin");
    }
  };

  const stripe = useStripe();

const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/create_stripe_session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { session_id } = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session_id,
    });

    if (result.error) {
      console.error(result.error.message);
      return; // exit if Stripe checkout fails
    }

    // Pass the cart items to the Success component
    setSelectedPlan({
      id: generateUniqueID(myCart),
      price: totalPrice,
    });
    setPurchasedItems(myCart); // Update purchasedItemsAtom with cart items
  } catch (error) {
    console.error("An error occurred during checkout: ", error);
  }
};

  const clearCart = () => {
    setCart({ cartlist: [] });
    // Add logic to clear the cart in the backend if necessary
  };

  return (
    <>
      <div className='background-style'>
        <div className='flex justify-center items-center min-h-screen opacity-90'>
          <div className='bg-white p-8 rounded shadow-md mt-[-200px]'>
            <h1 className='text-2xl mb-4 text-center'>Mon panier</h1>
            {myCart.length != 0 ? (
              <>
                <p className='text-xl mb-4 text-center'>
                  Vous avez {myCart.length} article(s) dans votre panier
                </p>

                {myCart.map((item) => (
                  <>
                    <p className='m-2'>
                      {item.name} {item.price}€{" "}
                      <button
                        className='delete-from-cart'
                        onClick={() => handleDeleteFromCartClick(item.id)}>
                        Supprimer du panier
                      </button>
                    </p>
                  </>
                ))}
                <h1 className='text-2xl mb-4 text-center totalprice'>
                  Total : {totalPrice}€
                </h1>
                <button
                  className='buybutton flex justify-center items-center'
                  onClick={handleCheckout}>
                  Passer à la caisse
                </button>
              </>
            ) : (
              "Votre panier est vide"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
