import React, { useState } from 'react';


function App() {
  const [licheng, setLicheng] = useState('');

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
        setLicheng(data.message);  
      })
  };

  return (
    <>
      
    </>
  );
}

export default App;
