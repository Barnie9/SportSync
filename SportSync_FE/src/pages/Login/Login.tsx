import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// CSS
import LoginCSS from "./Login.module.css";

// Images
import Logo from "../../images/logo.png";
import Footballer from "../../images/footballer.png";

function Login() {
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            if (emailAddress === '' || password === '') {
                alert('Please fill out all fields');
                return;
            }

            const response = await axios.post('http://localhost:8090/login', { emailAddress: emailAddress, password: password })

            localStorage.setItem('emailAddress', response.data);

            navigate('/')
        } catch (error: any) {
            setErrorMessage(error.response.data);
        }
    };

    return (
        <Box className={LoginCSS.background}>
            <Grid container xs={10} md={8} className={LoginCSS.container}>
                <Grid container xs={12} md={6} className={LoginCSS.left_column}>

                    <Grid item xs={12} md={12} className={LoginCSS.item}>
                        <button className={LoginCSS.home_button} onClick={() => navigate("/home")}>
                            <img
                                src={Logo}
                                alt="Logo"
                                className={LoginCSS.logo}
                            ></img>
                            <p className={LoginCSS.app_title}>SportSync</p>
                        </button>
                    </Grid>

                    <Grid item xs={12} md={12} className={LoginCSS.item}>
                        <img src={Footballer}
                            alt="footballer"
                            className={LoginCSS.image}
                        ></img>
                    </Grid>
                </Grid>
            <Grid container xs={12} md={6} className={LoginCSS.right_column}>
                <Grid item xs={12} md={12} className={LoginCSS.item}>
                    <h1 className={LoginCSS.title}> Login</h1>
                </Grid>

                <Grid item xs={12} md={12} className={LoginCSS.item}>
                    <input
                        type="text"
                        placeholder="Email"
                        className={LoginCSS.input}
                        value={emailAddress}
                        onChange={(event) =>
                            setEmailAddress(event.target.value)
                        }
                    ></input>
                </Grid>

                <Grid item xs={12} md={12} className={LoginCSS.item}>
                    <input
                        type="password"
                        placeholder='Password'
                        className={LoginCSS.input}
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    ></input>
                </Grid>
                <Grid item xs={12} md={12} className={LoginCSS.item}>
                    <p className={LoginCSS.text_error}> {errorMessage} </p>
                </Grid>
                <Grid item xs={12} md={12} className={LoginCSS.item}>
                    <button className={LoginCSS.button} onClick={handleLogin}>
                        Login
                    </button>
                </Grid>
                <Grid item xs={12} md={12} className={LoginCSS.item}>
                    <p className={LoginCSS.text}>
                        You don't have an account?{" "}
                        <Link to="/Register" className={LoginCSS.link}>
                            Register here
                        </Link>
                    </p>
                </Grid>
            </Grid>
        </Grid>
        </Box >
    );
};

export default Login;
