import React, { useState } from 'react'
import styles from '../styles/signup.module.css'

const Signup = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

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
        <div>
            {/* logo */}
            <div className= {styles.logo}>

            </div>
            <h1>Sing up to Light.io</h1>
            {/* sign up form with email, password, and confirm password 
                */}
            <div>
                <form>
                    <div>
                        <label>Username</label>
                        <input type="username" required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" required />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            
        </div>  
    )
}

export default Signup