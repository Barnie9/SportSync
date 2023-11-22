import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

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
            <h2>Login</h2>
            <form>
                <label>
                    Email Address:
                    <input type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            <p>
                Don't have an account?{' '}
                <Link to="/register" style={{ cursor: 'pointer', color: 'blue' }}>
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;
