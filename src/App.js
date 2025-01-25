import React from 'react';
import Navbar from './components/Navbar';


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
      <Navbar />
    </>
  );
}

export default App;
