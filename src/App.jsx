import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Register from "@/components/Register";
import SignIn from "@/components/SignIn";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import TrainingPlanView from "@/components/TrainingPlanView";
import Confidentiality from "./pages/Confidentiality";
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";
import Trainings from "./components/Trainings";
import ShoppingCart from "./components/ShoppingCart";

function App() {

  return (
    <div className='main-content flex flex-col min-h-screen'>
      <Router>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/confidentiality' element={<Confidentiality />} />
            <Route path='/legal' element={<Legal />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/training_plan/:id'
              element={<TrainingPlanView />}
            />
            <Route path='/trainings' element={<Trainings />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
