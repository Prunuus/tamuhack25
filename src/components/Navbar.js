import React from 'react'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        
        {/* logo and name */}
        <div className={styles.leftSide}>
            <div className={styles.navImg}/>
            <h1 className={styles.navText}>
                Light.io
            </h1>
        </div>

        {/* about and login */}
        <div className={styles.rightSide}>
            <a href='/' >
                <button style={{color:'white'}} className={styles.buttons}>About</button>
            </a>
            <a href='/' className={styles.login}>
                <button className={styles.buttons}>Login</button>
            </a>
        </div>
    </div>
  )
}

export default Navbar