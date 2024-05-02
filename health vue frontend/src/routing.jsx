import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from "./components/Login.jsx"
import Home from './components/Home.jsx';
import Prediction from './components/Prediction.jsx';



function Rout() {
   // console.log("router working");
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Home/>} />  
        <Route  path="/prediction" element={<Prediction/>} />  
      </Routes>
    </Router>
  );
}

export default Rout;
