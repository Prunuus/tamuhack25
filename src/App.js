import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/Signup.js';
import Generate from './pages/generate';
import Idea from './pages/idea';
import Track from './pages/track';
import LoginPage from './pages/Login.js';
import Home from './pages/home.js'


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
    <>
      {/* Excludes Navbar from these pages */}
      {!['/generate', '/idea', '/track', '/signup'].includes(window.location.pathname) && <Navbar />}

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/idea" element={<Idea />} />
            <Route path="/track" element={<Track />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Login" element={<LoginPage />} />
          </Routes>
        
        
    </>
  );
}

export default App;