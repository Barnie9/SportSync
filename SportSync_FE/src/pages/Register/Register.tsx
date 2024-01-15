import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// CSS
import RegisterCSS from "./Register.module.css";

// Images
import Logo from "../../images/logo.png";
import Footballer from "../../images/footballer.png";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Register({ onChangeUsername }: Props) {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

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
		} else if (errorMessages[2] === "mismatch") {
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
				emailAddress === "" ||
				password === "" ||
				confirmPassword === ""
			) {
				alert("Please fill out all fields");
				return;
			}

			await axios.post("http://localhost:8090/users/register", {
				username: username,
				emailAddress: emailAddress,
				password: password,
				confirmPassword: confirmPassword,
			});

			navigate("/login");
		} catch (error: any) {
			setErrorMessages(error.response.data.split(","));
		}
	};

	useEffect(() => {
		const waitForSetErrors = async () => {
			await setErrors();
		};

		waitForSetErrors();
	}, [errorMessages]);

	return (
		<div className={RegisterCSS.page}>
			<div className={RegisterCSS.left_container}>
				<button
					className={RegisterCSS.home_button}
					onClick={() => navigate("/home")}
				>
					<img
						src={Logo}
						alt="Logo"
						className={RegisterCSS.logo}
					></img>
					<div className={RegisterCSS.app_title}>SportSync</div>
				</button>

				<img
					src={Footballer}
					alt="footballer"
					className={RegisterCSS.image}
				></img>
			</div>
			<div className={RegisterCSS.right_container}>
				<div className={RegisterCSS.title}>Register</div>
				<div className={RegisterCSS.form_container}>
					<input
						type="text"
						placeholder="Username"
						className={
							usernameError === ""
								? RegisterCSS.input
								: RegisterCSS.input_error
						}
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					></input>
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
					<input
						type="password"
						placeholder="Password"
						className={
							passwordError === ""
								? RegisterCSS.input
								: RegisterCSS.input_error
						}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					></input>
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

					<div className={RegisterCSS.text_error}>
						{usernameError}
					</div>
					<div className={RegisterCSS.text_error}>
						{emailAddressError}
					</div>
					<div className={RegisterCSS.text_error}>
						{passwordError}
					</div>
				</div>

				<button
					className={RegisterCSS.register_button}
					onClick={handleRegister}
				>
					Register
				</button>

				<div className={RegisterCSS.text}>
					Already have an account?{" "}
					<Link to="/login" className={RegisterCSS.link}>
						Login here
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
