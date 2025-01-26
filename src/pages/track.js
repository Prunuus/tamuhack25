'use client'
import styles from '../styles/track.module.css'
import { Link } from 'react-router-dom';

const background = {
    background: "white",
    height: '100vh',
    width: '100vw'
}

export default function Track() {
    return (
        <div style={background}>
            <div style={{
                height: '100vh', 
                width: '100vw', 
                backgroundColor: "#25203B",
                display: "flex"
                }}>
                <div className={styles.navbar} style={{zIndex: '1000'}}>
                    <Link to="/" className={`${styles.leftSide} ${styles.link}`}>
                        <div className={styles.navImg}/>
                        <h1 className={styles.navText}>
                            Light.io
                        </h1>
                    </Link>
                    <div className={styles.rightSide}>
                        <Link to="/generate" className={styles.buttonContainer}>
                            <button id="generate" className={styles.buttons}>Generate</button>
                        </Link>
                    </div>
                </div>
                <div className={styles.mainContainer}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gridAutoRows: "180px",
                        gap: "50px",
                        margin: "140px 80px"
                    }}
                    >
                        <button style={{
                            gridColumn: "span 6",
                            backgroundColor: "#594D8F",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "30px",
                            borderRadius: "15px",
                            border: "none",
                        }}
                        >
                            <div clasName={styles.boxContainer}>
                                <h1 className={styles.boxTitle}>Insert Idea Name</h1>
                                <p className={styles.boxText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                </p>
                            </div>
                        </button>
                        <button style={{
                            gridColumn: "span 6",
                            backgroundColor: "#594D8F",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "30px",
                            borderRadius: "15px",
                            border: "none",
                        }}
                        >
                            <div clasName={styles.boxContainer}>
                                <h1 className={styles.boxTitle}>Insert Idea Name</h1>
                                <p className={styles.boxText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                </p>
                            </div>
                        </button>
                        <button style={{
                            gridColumn: "span 6",
                            backgroundColor: "#594D8F",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "30px",
                            borderRadius: "15px",
                            border: "none",
                        }}
                        >
                            <div clasName={styles.boxContainer}>
                                <h1 className={styles.boxTitle}>Insert Idea Name</h1>
                                <p className={styles.boxText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                </p>
                            </div>
                        </button>
                        <button style={{
                            gridColumn: "span 6",
                            backgroundColor: "#594D8F",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "30px",
                            borderRadius: "15px",
                            border: "none",
                        }}
                        >
                            <div clasName={styles.boxContainer}>
                                <h1 className={styles.boxTitle}>Insert Idea Name</h1>
                                <p className={styles.boxText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
