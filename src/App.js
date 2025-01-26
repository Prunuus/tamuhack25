import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/Signup.js';
import Generate from './pages/generate';
import Idea from './pages/idea';
import Track from './pages/track';


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
      <Router>
        <Routes>
        <Route path="/generate" element={<Generate />} />
          <Route path="/idea" element={<Idea />} />
          <Route path="/track" element={<Track />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
