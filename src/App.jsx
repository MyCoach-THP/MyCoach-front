import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Register from "@/components/Register";
import SignIn from "@/components/SignIn";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import TrainingPlanView from "@/components/TrainingPlanView";
import Confidentiality from "./pages/Confidentiality";
import Legal from "./pages/Legal";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ContactForm from "./components/ContactForm";
import AllTrainingPlans from "./components/AllTrainingPlans";
import StripeContainer from "./components/StripeContainer";
import { useAtom } from "jotai";
import { authAtom } from "./components/authAtom";
import { cartAtom } from "./components/cartAtom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ShoppingCart from "./components/ShoppingCart";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import NotFoundPage from "./components/NotFoundPage";
import { API_BASE_URL } from "../config";


const stripePromise = loadStripe(
  "pk_test_51N8h8sAhrOPnCIzT2ugqqe9aJvcLkKKKpomNhFpG9DecpeMucOPevdw1Pcxv3nWcp5MccbwzjP6ttuzAdXklMgOX00vBWvPGrf"
);

function App() {
  const [authState, setAuthState] = useAtom(authAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      setAuthState({
        user_id: localStorage.getItem("user_id"),
        token: localStorage.getItem("token"),
        isLoggedIn: true,
      });

      getCart();
    }
  }, []);

  const getCart = () =>{
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
        const items = data.cartlist;
        setCart({cartlist: items})
      })
      .catch((error) => {
        console.error("There was an error fetching cart data!", error);
      });
  }

  useEffect(()=>{
    setCartCount(cart.cartlist.length);
  },[cart])

  return (
    <div className='main-content flex flex-col min-h-screen'>
      <Router>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/confidentiality' element={<Confidentiality />} />
          <Route path='/legal' element={<Legal />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/training_plan/:id' element={<TrainingPlanView />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/ContactForm' element={<ContactForm />} />
          <Route path='/AllTrainingPlans' element={<AllTrainingPlans />} />
          <Route path='/StripeContainer' element={<StripeContainer />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route
            path='/coachProfile/:id'
            element={<Profile userType='coach' />}
          />
          <Route
            path='/shoppingcart'
            element={
              <Elements stripe={stripePromise}>
                <ShoppingCart />
              </Elements>
            }
          />{" "}
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/ResetPassword/:token' element={<ResetPassword />} />
          {/* <Route
            path='/success'
            element={
              <StripeSuccessGuard>
                <Success />
              </StripeSuccessGuard>
            }
          />{" "} */}
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
