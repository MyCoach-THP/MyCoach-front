import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/components/Home";
// import Header from "@/components/header";

function App() {
  return (
    <div className='main-content'>
      <Router>
        {/* <Header /> */}
        <Routes location={location}>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
