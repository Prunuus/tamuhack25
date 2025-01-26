import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

const Login = () => {
    const navigate = useNavigate();
    
 
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const validateForm = () => {
        {/*-------------------add username checks later------------------------------------------------*/}
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        if (form.password.length < 8) {
            alert('Password must be at least 8 characters');
            return false;
        }
        if (!form.email.includes('@')) {
            alert('Invalid email');
            return false;
        }
        return true
    }


    const handleSuccess = (response) => {
        console.log("Login Status:", response)
        navigate('/generate')

    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return (
        <div className={styles.background} >
            {/* logo */}
            <div className={styles.logo}></div>
            <h1 style={{color:"white", margin:"0", marginBottom:"20px"}}>Login into to Light.io</h1>
            {/* sign up form with email, password, and confirm password 
                */}
            <div className={styles.card}> 
                <form className={styles.form}>
                    <input
                    className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address*"
                        required
                    />
                    <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required />
                    <button className={styles.button} type="submit">Login Up</button>
                    <p style={{margin:0, color:"white"}}>Dont have an account?  <Link to={'/Signup'}>Sign Up</Link></p>
                    <hr style={{width:'100%', color:'white', alignSelf:"flex-start"}}/>
                    <GoogleLogin onSuccess={handleSuccess} onError={errorMessage} />
                </form>

            </div>
            
        </div>  
    )
}

export default Login