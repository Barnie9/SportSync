import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

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
        <div>
            <h2>Register</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
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
                <button type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to="/login" style={{ cursor: 'pointer', color: 'blue' }}>
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;
