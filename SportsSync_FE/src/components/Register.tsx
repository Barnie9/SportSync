import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './style/Register.css';
import './images/TerenFotbal.png';

function Register() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (username === '' || firstName === '' || lastName === '' || emailAddress === '' || password === '') {
                alert('Please fill out all fields');
                return;
            }

            await axios.post('http://localhost:8090/register', { username: username, firstName: firstName, lastName: lastName, emailAddress: emailAddress, password: password })

            navigate('/login')
        }
        catch (error: any) {
            alert(error.response.data);
        }
    };

    return (
        <div className='container'>
            <h2 className='register-title'>Register</h2>
            <form>
                <label className='username-label username'>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label className='username-label first_name'>
                    First Name:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label className='username-label last_name'>
                    Last Name:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
                <label className='username-label address'>
                    Email Address:
                    <input type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                </label>
                <br />
                <label className='username-label password'>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button className='register-button' type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to="/login">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;
