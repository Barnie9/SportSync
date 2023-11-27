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
        <div className='parent-container'>
           
                <div className='container'>
                <img src={require('./images/fotbal.png')}></img>

                <h2 className='register-title'>Register</h2>
                <form className='register-form'>

                        <div className='row'>
                            <div className='column'>
                                <label className='first-name-column'>First Name:</label>      
                            </div>
                            <div className='column'>
                                <label className='last-name-column'>Last Name:</label>      
                            </div>
                        </div>

                        <div className='row 2'>
                            <div className='column'>
                                <div className='name-input 1'>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className='column'>
                                <div className='name-input 2'>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                        </div>

                       
                        <div className='last-of-content-form'>
                            <label className='username-label username'>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                       
                            <label className='username-label address'> Email Address:  </label>
                            <input type="text" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                     
                            <label className='username-label password'>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                       
                            <button className='register-button' type="button" onClick={handleRegister}>
                                Register
                            </button>
                            <p className='sign-in-message'>
                                    Already have an account?{' '}
                                <Link to="/login">
                                    Login here
                                </Link>
                            </p>
                        </div>
                </form>
               
            </div>
        </div>
    );
};

export default Register;
