import React, { useState } from 'react'
import styles from '../styles/signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch('/api/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(form),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Signup failed');
            }
      
            navigate('/login'); // Redirect to login after successful signup
          } catch (err) {
            setError(err.message);
          }
        };

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
        const decoded = jwtDecode(response.credential)
        const userData = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture
        }
        navigate('/generate', {state: {user:userData}})

    };
    const errorMessage = (error) => {
        console.log(error);
    };

    

    return (
        <div className={styles.background} >
            {/* logo */}
            <div className={styles.logo}></div>
            <h1 style={{color:"white", margin:"0", marginBottom:"20px"}}>Sign up to Light.io</h1>
            {/* sign up form with email, password, and confirm password 
                */}
            <div className={styles.card}> 
                <form onSubmit={handleSubmit} className={styles.form}>
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
                    <input 
                        className={styles.input}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        required />
                    <button onSuccess={handleSuccess} className={styles.button} type="submit">Sign Up</button>
                    <p style={{margin:0, color:"white"}}>Already have an account?  <Link to={'/Login'}>Log In</Link></p>
                    <hr style={{width:'100%', color:'white', alignSelf:"flex-start"}}/>
                    {/* <button className={styles.button} type="submit">Sign Up with Google</button> */}
                    <GoogleLogin onSuccess={handleSuccess} onError={errorMessage} />
                </form>

            </div>
            
        </div>  
    )
}

export default Signup