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
    const location = useLocation();
    const user = location.state?.user;
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