'use client'
import styles from '../styles/idea.module.css'
import React, { handleEnter, handleChange, useState, button } from 'react';
import { Link } from 'react-router-dom';

const background = {
    background: "white",
    height: '100vh',
    width: '100vw'
}

export default function Idea() {
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
                    <Link to="/" className={`${styles.leftSide} ${styles.link}`}>
                        <div className={styles.navImg}/>
                        <h1 className={styles.navText}>
                            Light.io
                        </h1>
                    </Link>
                    <div className={styles.rightSide}>
                        <Link to="/track" className={styles.buttonContainer}>
                            <button id="track" className={styles.buttons}>Track</button>
                        </Link>
                    </div>
                </div>

                <div className={styles.mainContainer}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gridAutoRows: "min-content",
                        gap: "50px",
                        padding: "20px",
                        width: "100vw",
                        marginTop: "140px",
                        boxSizing: "border-box",
                        justifyContent: "flex-start",
                    }}>
                        <div style={{
                            gridColumn: "span 6",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignSelf: "flex-start",
                        }}>
                            <div className={styles.boxBar}>
                                <div id={styles.ideaName} className={styles.boxTitle}>
                                    <h1>Insert Idea Name</h1>
                                </div>
                                <button className={styles.boxButton}>
                                    New Idea
                                </button>
                            </div>
                            <div className={styles.boxContainer}>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, 
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                        <div style={{
                            gridColumn: "span 6",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignSelf: "flex-start",
                        }}>
                            <div id={styles.checklist} className={styles.boxTitle}>
                                <h1>Checklist</h1>
                            </div>
                            <div className={styles.boxContainer}>
                                <ol className={styles.list}>
                                    <li>
                                        Define habits to track (e.g., sleep, exercise).
                                    </li>
                                    <li>
                                        Collect data from user input or sensors.
                                    </li>
                                    <li>
                                        Analyze patterns in daily routines.
                                    </li>
                                    <li>
                                        Train AI to predict and suggest improvements.
                                    </li>
                                    <li>
                                        Design a simple, user-friendly app interface.
                                    </li>
                                    <li>
                                        Provide personalized habit recommendations.
                                    </li>
                                    <li>
                                        Test with users and refine features.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}