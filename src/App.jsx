import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Register from "@/components/Register";
import SignIn from "@/components/SignIn";
import Footer from "@/components/Footer";
import Confidentiality from "./pages/Confidentiality";
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className='main-content flex flex-col min-h-screen'>
      <Router>
        <Navbar />
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/confidentiality' element={<Confidentiality />} />
            <Route path='/legal' element={<Legal />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
