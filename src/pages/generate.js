'use client'
import styles from '../styles/generate.module.css'
import React, { handleEnter, handleChange, useState, button } from 'react';
import { useLocation, Link } from 'react-router-dom';
const background = {
    background: "white",
    height: '100vh',
    width: '100vw'
}

export default function Generate() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const location = useLocation();
    const user = location.state?.user;

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            try {
                const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
        });
                
                if (!res.ok) throw new Error('Request failed');
                const data = await res.json();
                setResponse(data.response);
            } catch (error) {
                console.error('Error:', error);
                setResponse('Error generating response');
            }
        }
    };
    return (
        <div style={background}>
            <div style={{
                height: '100vh', 
                width: '100vw', 
                backgroundColor: "#25203B",
                display: "flex"
                }}>
                {/* Navbar */}
                <div className={styles.navbar} style={{zIndex: '1000'}}>
                    <Link to="/idea" className={styles.buttonContainer}>
                        <button id="ideas" className={styles.buttons}>Ideas</button>
                    </Link>
                    <div className={styles.userContainer}>
                        
                    </div>
                </div>

                {/* Main Content */}
                <div className={styles.mainContainer}> 
                    <div className={styles.contentContainer}>
                        {console.log(user)}
                        <h1 style={{color:"white",textAlign:"center"}}>Welcome, {user?.name}!</h1>
                        {/* Logo */}
                        <div className={styles.titleContainer}>
                            <div className={styles.logo}/>
                            <h1 className={styles.title}>Light.io</h1>
                        </div>
                        {/* Prompt Bar */}
                        <div className={styles.promptContainer}>
                            <input 
                                className={styles.promptInput} 
                                type="text" 
                                placeholder="Type the prompt here" 
                                onKeyDown={handleEnter}
                                onChange={handleChange}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}