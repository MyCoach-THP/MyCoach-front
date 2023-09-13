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
import ShoppingCart from "./components/ShoppingCart";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ContactForm from "./components/ContactForm";
import AllTrainingPlans from "./components/AllTrainingPlans";
import { useAtom } from "jotai";
import { authAtom } from "./components/authAtom";
import { cartAtom } from "./components/cartAtom";

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

      if (localStorage.getItem("cartlist")){
        let items = localStorage.getItem("cartlist").split(',');
        setCart({cartlist: items})
      }

      setCartCount(cart.cartlist.length);
    }
  }, []);

  useEffect(()=>{
    setCartCount(cart.cartlist.length);
  }, [cart.cartlist.length])

  return (
    <div className='main-content flex flex-col min-h-screen'>
      <Router>
        <Navbar cartCount={cart.cartlist.length} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/confidentiality' element={<Confidentiality />} />
          <Route path='/legal' element={<Legal />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/training_plan/:id' element={<TrainingPlanView />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/ContactForm' element={<ContactForm />} />
          <Route path='/AllTrainingPlans' element={<AllTrainingPlans />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route
            path='/coachProfile/:id'
            element={<Profile userType='coach' />}
          />
          <Route path='/shoppingcart' element={<ShoppingCart />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/ResetPassword/:token' element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
