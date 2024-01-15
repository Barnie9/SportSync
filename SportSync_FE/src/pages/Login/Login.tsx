import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// CSS
import LoginCSS from "./Login.module.css";

// Images
import Logo from "../../images/logo.png";
import Footballer from "../../images/footballer.png";

function Login() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async () => {
		try {
			if (username === "" || password === "") {
				alert("Please fill out all fields");
				return;
			}

			const response = await axios.post("http://86.125.232.27:8090/login", {
				username: username,
				password: password,
			});

			localStorage.setItem("username", response.data);

			navigate("/");
		} catch (error: any) {
			setErrorMessage(error.response.data);
		}
	};

	return (
		<div className={LoginCSS.page}>
			<div className={LoginCSS.left_container}>
				<button
					className={LoginCSS.home_button}
					onClick={() => navigate("/home")}
				>
					<img
						src={Logo}
						alt="Logo"
						className={LoginCSS.logo}
					></img>
					<div className={LoginCSS.app_title}>SportSync</div>
				</button>

				<img
					src={Footballer}
					alt="footballer"
					className={LoginCSS.image}
				></img>
			</div>

			<div className={LoginCSS.right_container}>
				<div className={LoginCSS.title}>Login</div>

				<input
					type="text"
					placeholder="Username"
					className={LoginCSS.input}
					value={username}
					onChange={(event) =>
						setUsername(event.target.value)
					}
				></input>

				<input
					type="password"
					placeholder="Password"
					className={LoginCSS.input}
					value={password}
					onChange={(event) =>
						setPassword(event.target.value)
					}
				></input>

				<div className={LoginCSS.text_error}>{errorMessage}</div>

				<button
					className={LoginCSS.login_button}
					onClick={handleLogin}
				>
					Login
				</button>

				<div className={LoginCSS.text}>
					You don't have an account?{" "}
					<Link to="/register" className={LoginCSS.link}>
						Register here
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
