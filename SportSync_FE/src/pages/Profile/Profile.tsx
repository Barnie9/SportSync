import React, { useState, useEffect } from "react";

import axios from "axios";

// CSS
import ProfileCSS from "./Profile.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import { profile } from "console";
import Stats from "../../components/Stats/Stats";







function Profile() {
	const [username, setUsername] = useState(localStorage.getItem("username") || "");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [password, setPassword] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [foot, setFoot] = useState("");
	const [errorMessages, setErrorMessages] = useState(["ok", "ok", "ok", "ok", "ok", "ok","ok"]);
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [footError, setFootError] = useState("");
	const[firstNameError, setFirstNameError] = useState("");
	const[lastNameError, setLastNameError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");
	const [positionError, setPositionError] = useState("");

	const setErrors = async () => {
		if (errorMessages[0] === "present") {
			setUsernameError("* Username already exists");
		} else if (errorMessages[0] === "ok") {
			setUsernameError("");
		}

		if (errorMessages[1] === "invalid") {
			setPasswordError(
				"* Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number"
			);
		} else if (errorMessages[1] === "ok") {
			setPasswordError("");
		}
		if(errorMessages[2] === "invalid"){
			setFootError("* Need to choose a foot");}
		else if(errorMessages[2] === "ok"){
				setFootError("");
		}
		if(errorMessages[3] === "invalid"){
			setFirstNameError("* Invalid first name, need to have minimum 3 characters!");}
		else if(errorMessages[3] === "ok"){
				setFirstNameError("");
		}
		if(errorMessages[4] === "invalid"){
			setLastNameError("* Invalid last name, need to have minimum 3 characters!");}
		else if(errorMessages[4] === "ok"){
				setLastNameError("");
		}
		
		if(errorMessages[5] === "invalid"){
			setPhoneNumberError("* Invalid phone number, need to contain just numbers!");}
		else if(errorMessages[5] === "ok"){
				setPhoneNumberError("");
		}
		if(errorMessages[6] === "invalid"){
			setPositionError("* Need to choose a position");}
		else if(errorMessages[6] === "ok"){
				setPositionError("");
		}


	};
	useEffect(() => {
		const waitForSetErrors = async () => {
			await setErrors();
		};

		waitForSetErrors();
	}, [errorMessages]);


	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`http://86.125.232.27:8090/users/${username}`);
				const userData = response.data;

				setEmail(userData.emailAddress || "");
				setFirstName(userData.firstName || "");
				setPassword(userData.password || "");
				setBirthDate(userData.birthDate || "");
				setLastName(userData.lastName || "");
				setPosition(userData.position || "");
				setPhoneNumber(userData.phoneNumber || "");
				setFoot(userData.foot || "");
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchUserData();
		
	}, [username]); // Trigger the effect when the 'username' state changes

	const handleRegister = async () => {
		try {
			if (
				username === "" ||
				email === "" ||
				password === ""
			) {
				alert("Please fill out all fields!");
				return;
			}

			await axios.post("http://86.125.232.27:8090/users/update", {
				username: username,
				emailAddress: email,
				password: password,
				firstName: firstName,
				lastName: lastName,
				birthDate: birthDate,
				phoneNumber: phoneNumber,
				foot: foot,
				position: position,

			});

		} catch (error: any) {
			setErrorMessages(error.response.data.split(","));
		}
	};
	return (
		<>
			<div className={ProfileCSS.page}>
				<Menu selectedPage="Profile" />

				<div className={ProfileCSS.container}>
					<div className={ProfileCSS.left_side}>
						<p className={ProfileCSS.profile_title}>Edit Profile</p>
						<div className={ProfileCSS.profile_container}>
							<div className={ProfileCSS.profile_left}>
								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										First Name:
									</div>
									<input
										className={firstNameError === "" ? ProfileCSS.input : ProfileCSS.input_error}
										placeholder="..."
										value={firstName}
										onChange={(event) => {
											setFirstName(event.target.value);
										}}
									/>
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Email Address:
									</div>
									<input
										className={ProfileCSS.input}
										placeholder="..."
										value={email}
										onChange={(event) => {
											setEmail(event.target.value);
										}}
										readOnly />
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Password:
									</div>
									<input
										className={passwordError === ""
												? ProfileCSS.input
												: ProfileCSS.input_error
										}
										type="password"
										placeholder="..."
										value={password}
										onChange={(event) => {
											setPassword(event.target.value);
										}}
									/>
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Birth Date:
									</div>
									<input
										type="date"
										className={ProfileCSS.input}
										value={birthDate}
										onChange={(event) => {
											setBirthDate(event.target.value);
										}}
									/>
								</div>

							</div>




							<div className={ProfileCSS.profile_right}>


								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Last Name:
									</div>
									<input
										className={lastNameError === "" ? ProfileCSS.input : ProfileCSS.input_error}
										placeholder="..."
										value={lastName}
										onChange={(event) => {
											setLastName(event.target.value);
										}}
									/>
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Position:
									</div>
									<select
										className={positionError === "" ? ProfileCSS.input : ProfileCSS.input_error}
										value={position}
										onChange={(event) => {
											setPosition(event.target.value);
										}}
									>
										<option value="">Select Position</option>
										<option value="goalkeeper">Goalkeeper</option>
										<option value="midfielder">Midfielder</option>
										<option value="striker">Striker</option>
										<option value="defender">Defender</option>
									</select>
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Phone Number:
									</div>
									<input
										className={phoneNumberError === "" ? ProfileCSS.input : ProfileCSS.input_error}
										placeholder="..."
										value={phoneNumber}
										onChange={(event) => {
											setPhoneNumber(event.target.value);
										}}
									/>
								</div>
								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Foot:
									</div>
									<select
										className={footError === "" ? ProfileCSS.input : ProfileCSS.input_error}
										value={foot}
										onChange={(event) => {
											setFoot(event.target.value);
										}}
									>
										<option value="">Select Foot</option>
										<option value="left">Left</option>
										<option value="right">Right</option>
										<option value="both">Both</option>
									</select>
								</div>
							</div>
							
							
						</div>
						<div className={ProfileCSS.text_error}>
								{passwordError}
							</div>
							<div className={ProfileCSS.text_error}>
								{firstNameError}
							</div>
							<div className={ProfileCSS.text_error}>
								{lastNameError}
							</div>
							<div className={ProfileCSS.text_error}>
								{footError}
							</div>
							<div className={ProfileCSS.text_error}>
								{positionError}
							</div>
							<div className={ProfileCSS.text_error}>
								{phoneNumberError}
							</div>
							<div className={ProfileCSS.text_error}>
								{usernameError}
							</div>
						<button onClick={handleRegister} className={ProfileCSS.button}>Save Changes</button>
					</div>

					<div className={ProfileCSS.right_side}>
						<p className={ProfileCSS.statistics_title}>Statistics</p>
						<Stats username={username}/>

					</div>

				</div>
			</div>
		</>
	);
}

export default Profile;
