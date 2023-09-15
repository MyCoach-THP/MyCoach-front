import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StripeProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const referrer = document.referrer;
    if (!referrer.includes("stripe.com")) {
      navigate("/"); // Redirect to home page if not coming from Stripe
    }
  }, []);

  return children;
};

export default StripeProtectedRoute;
