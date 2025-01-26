import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/Signup.js';
import LoginPage from './pages/Login.js';



function App() {

  // Handle click event
  const handleClick = () => {
    console.log('clicked');
    fetch('http://127.0.0.1:5000/licheng')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        console.log(data.message); 
      })
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
