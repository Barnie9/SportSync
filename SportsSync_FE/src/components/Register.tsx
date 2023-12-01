import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// CSS
import RegisterCSS from "./style/Register.module.css";

// Images
import Logo from "./images/logo.png";
import Footballer from "./images/footballer.png";

function Register() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [gender, setGender] = useState("");

	const [usernameError, setUsernameError] = useState("");
	const [emailAddressError, setEmailAddressError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const [errorMessages, setErrorMessages] = useState(["ok", "ok", "ok"]);

	const setErrors = async () => {
		if (errorMessages[0] === "present") {
			setUsernameError("* Username already exists");
		} else if (errorMessages[0] === "ok") {
			setUsernameError("");
		}

		if (errorMessages[1] === "invalid") {
			setEmailAddressError("* Invalid email address");
		} else if (errorMessages[1] === "present") {
			setEmailAddressError("* Email address already exists");
		} else if (errorMessages[1] === "ok") {
			setEmailAddressError("");
		}

		if (errorMessages[2] === "invalid") {
			setPasswordError(
				"* Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"
			);
			setConfirmPasswordError("");
		} else if (errorMessages[2] === "notMatching") {
			setPasswordError("* Passwords do not match");
			setConfirmPasswordError("* Passwords do not match");
		} else if (errorMessages[2] === "ok") {
			setPasswordError("");
			setConfirmPasswordError("");
		}
	};

	const handleRegister = async () => {
		try {
			if (
				username === "" ||
				firstName === "" ||
				lastName === "" ||
				emailAddress === "" ||
				password === "" ||
				confirmPassword === "" ||
				gender === ""
			) {
				alert("Please fill out all fields");
				return;
			}

			await axios.post("http://localhost:8090/register", {
				username: username,
				firstName: firstName,
				lastName: lastName,
				emailAddress: emailAddress,
				password: password,
				confirmPassword: confirmPassword,
				gender: gender,
			});

			navigate("/login");
		} catch (error: any) {
			setErrorMessages(error.response.data.split("|"));
		}
	};

	useEffect(() => {
		const waitForSetErrors = async () => {
			await setErrors();
		};

		waitForSetErrors();
	}, [errorMessages]);

	return (
		<Box className={RegisterCSS.background}>
			<Grid container xs={10} md={8} className={RegisterCSS.container}>
				<Grid
					container
					xs={12}
					md={6}
					className={RegisterCSS.left_column}
				>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<button className={RegisterCSS.home_button} onClick={() => navigate("/home")}>
								<img
									src={Logo}
									alt="Logo"
									className={RegisterCSS.logo}
								></img>
								<p className={RegisterCSS.app_title}>SportSync</p>
						</button>
					</Grid>

					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<img src={Footballer} alt="footballer" className={RegisterCSS.image}></img>
					</Grid>
				</Grid>
				<Grid
					container
					xs={12}
					md={6}
					className={RegisterCSS.right_column}
				>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<p className={RegisterCSS.title}>Register</p>
					</Grid>

					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<input
							type="text"
							placeholder="Username"
							className={
								usernameError === ""
									? RegisterCSS.input
									: RegisterCSS.input_error
							}
							value={username}
							onChange={(event) =>
								setUsername(event.target.value)
							}
						></input>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<input
							type="text"
							placeholder="First Name"
							className={RegisterCSS.input}
							value={firstName}
							onChange={(event) =>
								setFirstName(event.target.value)
							}
						></input>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<input
							type="text"
							placeholder="Last Name"
							className={RegisterCSS.input}
							value={lastName}
							onChange={(event) =>
								setLastName(event.target.value)
							}
						></input>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<input
							type="text"
							placeholder="Email"
							className={
								emailAddressError === ""
									? RegisterCSS.input
									: RegisterCSS.input_error
							}
							value={emailAddress}
							onChange={(event) =>
								setEmailAddress(event.target.value)
							}
						></input>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<input
							type="password"
							placeholder="Password"
							className={
								passwordError === ""
									? RegisterCSS.input
									: RegisterCSS.input_error
							}
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						></input>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<input
							type="password"
							placeholder="Confirm Password"
							className={
								confirmPasswordError === ""
									? RegisterCSS.input
									: RegisterCSS.input_error
							}
							value={confirmPassword}
							onChange={(event) =>
								setConfirmPassword(event.target.value)
							}
						></input>
					</Grid>

					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<select
							className={RegisterCSS.select}
							value={gender}
							onChange={(event) => setGender(event.target.value)}
						>
							<option value="" disabled hidden>
								{" "}
								Select gender{" "}
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</Grid>

					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<p className={RegisterCSS.text_error}>
							{usernameError}
						</p>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<p className={RegisterCSS.text_error}>
							{emailAddressError}
						</p>
					</Grid>
					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<p className={RegisterCSS.text_error}>
							{passwordError}
						</p>
					</Grid>

					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<button
							className={RegisterCSS.register_button}
							onClick={handleRegister}
						>
							Register
						</button>
					</Grid>

					<Grid item xs={12} md={12} className={RegisterCSS.item}>
						<p className={RegisterCSS.text}>
							Already have an account?{" "}
							<Link to="/login" className={RegisterCSS.link}>
								Login here
							</Link>
						</p>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Register;
