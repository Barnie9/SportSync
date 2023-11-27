import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './style/Login.css';

function Login() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (emailAddress === '' || password === '') {
                alert('Please fill out all fields');
                return;
            }

            const response = await axios.post('http://localhost:8090/login', { emailAddress: emailAddress, password: password })

            localStorage.setItem('emailAddress', response.data);

            navigate('/')
        }
        catch (error: any) {
            alert(error.response.data)
        }
    };

    return (
        <div>
            <div className='login-container-parent'>
                <div className='login-conainer'>

              
            <h2 className='form-title'>Login</h2>
            <form className='form-login'>
                <div className='login-component'>
                    <input placeholder='Username'    type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
            
                    <input  placeholder='Password'   type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='login-button' type="button" onClick={handleLogin}>
                    Login 
                </button>
                </div>
            </form>
            <p className='register-redirect'>
                Don't have an account?{' '}
                <Link to="/register" >
                    Register here
                </Link>
            </p>
            </div>
            </div>
        </div>
    );
};

export default Login;
