import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './style/Register.css';
import './images/TerenFotbal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
                    <div className='left-side'>
                        <img src={require('./images/fotbal.png')}></img>

                    </div>
                <div className='right-side'> 
                <h2 className='register-title'>Register</h2>
                <form className='register-form'>

              

                        <div className='row n2'>
                            <div className='column'>
                                <div className='name-input 1'>
                                <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className='column column2'>
                                <div className='name-input input2'>
                                <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                        </div>

                       
                        <div className='last-of-content-form'>
                            <input  type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <div>
                            <FontAwesomeIcon icon={solid("lock")} />
                            </div>
                            <i className="fa-solid fa-lock"></i>
                            <input    type="text" placeholder='Email Address' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                     
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                            <input type="password" placeholder='Confirm Password'  />

                            <div className='gender'>
                                <select id="gender" name="gender">
                                    <option value="" disabled selected hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
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
