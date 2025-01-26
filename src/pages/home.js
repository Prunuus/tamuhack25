'use client'
import styles from '../styles/home.module.css'
import navbar from '../styles/navbar.module.css'

const background = {
    background: "white",
    height: '100vh',
    width: '100vw'
}

export default function Home() {
    return(
        <div style={background}>
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundColor: "#25203B",
                display: "flex"
            }}>
                <div className={styles.heroContainer}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gridAutoRows: "180px",
                    gap: "50px",
                    width: "100vw",
                    margin: "140px 80px"
                }}
                >
                    <div style={{
                        gridColumn: "span 6",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div className={styles.louie}/>
                    </div>
                    <div style={{
                        gridColumn: "span 6",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div className={styles.getStarted}>
                            <h1 className={styles.slogan}>From Idea to Impact.</h1>
                            <button className={styles.startbutton}>
                                Get Started
                                <div className={styles.icon}/>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}