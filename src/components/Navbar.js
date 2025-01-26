import React from 'react'
import { Link } from 'react-router-dom';
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
        <Link to="/" className={styles.buttons}>
            <button style={{color:'white'}} className={styles.buttons}>About</button>
        </Link>
        <Link to="/Signup" className={styles.login}>
          <button className={styles.buttons}>Login</button>
        </Link>
      </div>
    </div>
  );
};
export default Navbar