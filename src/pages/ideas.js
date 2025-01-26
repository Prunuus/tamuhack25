import React, { useState, useEffect } from 'react'
import styles from '../styles/signup.module.css'

const Signup = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        console.log('clicked');
        fetch('http://localhost:3000/ideas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"use_fine_tuned":"True"})
    }).then(res => {res.json()}).then(data => console.log(data))}, [])

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

    const handleSubmit = (e) => {
         e.preventDefault();
         if (!validateForm()){
            return 
         }

         try {
            fetch('http://127.0.0.1:5000/Signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then(data => {
                console.log(data.message); 
            }
            )
         }
         catch (error) {
            console.error('Error:', error);
    }
}
    return (
        <div className={styles.background} >
            {/* logo */}
            <div className={styles.logo}></div>
            <h1 style={{color:"white"}}>Sign up to Light.io</h1>
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
                    <input 
                    className={styles.input}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Confirm Password'
                    required />
                    <button className={styles.input} type="submit">Sign Up</button>
                </form>
            </div>
            
        </div>  
    )
}

export default Signup