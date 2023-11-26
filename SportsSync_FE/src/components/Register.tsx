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
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (username === '' || firstName === '' || lastName === '' || emailAddress === '' || password === '' || passwordConfirmation === '') {
                alert('Please fill out all fields');
                return;
            }
            if (password !== passwordConfirmation) {
                alert('Passwords do not match');
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
                    <div className='left-side'>
                        <img src={require('./images/fotbal.png')}></img>

                    </div>
                <div className='right-side'> 
                <h2 className='register-title'>Register</h2>
                <form className='register-form'>

              

                        <div className='row n2'>
                            <div className='column'>
                                <div className='name-input 1'>
                                <label className='first-name-column'>First Name:</label>      
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className='column column2'>
                                <div className='name-input input2'>
                                <label className='last-name-column'>Last Name:</label>      
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

                            <label className='username-label password'>Confirm Password:</label>
                            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />

                            <div className='gender'>
                                <div className='gendertype male'>
                                    <input type="radio" value="none" id="male" name="gender" checked/>
                                    <label className="radio">Male</label>
                                </div>
                                <div className='gendertype female'>
                                <input type="radio" value="none" id="female" name="gender" />
                                <label  className="radio">Female</label>
                                </div>
                            </div>

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
        </div>
    );
};

export default Register;