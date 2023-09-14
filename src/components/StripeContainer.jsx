import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShoppingCart from "./ShoppingCart";

const stripePromise = loadStripe(
  "pk_test_51N8h8sAhrOPnCIzT2ugqqe9aJvcLkKKKpomNhFpG9DecpeMucOPevdw1Pcxv3nWcp5MccbwzjP6ttuzAdXklMgOX00vBWvPGrf"
);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <ShoppingCart />
    </Elements>
  );
};

export default StripeContainer;
