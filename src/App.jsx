import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Register from "@/components/Register"; 
import SignIn from "@/components/SignIn"; 

function App() {
  return (
    <div className='main-content'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
