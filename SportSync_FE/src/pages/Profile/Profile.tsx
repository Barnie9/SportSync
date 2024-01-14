import React, { useState, useEffect } from "react";

import axios from "axios";

// CSS
import ProfileCSS from "./Profile.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import { profile } from "console";

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
  const [errorMessages, setErrorMessages] = useState(["ok", "ok", "ok"]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://86.125.232.27:8090/users/${username}`);
        const userData = response.data;

        setEmail(userData.email || "");
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

		await axios.post("http://86.125.232.27:8090/register", {
			username: username,
			emailAddress: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			birthDate: birthDate,
			phoneNumber: phoneNumber,
			foot:foot,
			position:position,

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
										className={ProfileCSS.input}
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
									/>
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Password:
									</div>
									<input
										type="password"
										className={ProfileCSS.input}
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
										className={ProfileCSS.input}
										placeholder="..."
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
										className={ProfileCSS.input}
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
									<input
										className={ProfileCSS.input}
										placeholder="..."
										value={position}
										onChange={(event) => {
											setPosition(event.target.value);
										}}
									/>
								</div>

								<div className={ProfileCSS.item}>
									<div className={ProfileCSS.label}>
										Phone Number:
									</div>
									<input
										className={ProfileCSS.input}
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
									<input
										className={ProfileCSS.input}
										placeholder="..."
										value={foot}
										onChange={(event) => {
											setFoot(event.target.value);
										}}
									/>
								</div>
							</div>
						</div>
						<button onClick={handleRegister} className={ProfileCSS.button}>Save Changes</button>
					</div>

					<div className={ProfileCSS.right_side}>
						<p className={ProfileCSS.statistics_title}>Statistics</p>
						<div className={ProfileCSS.statistics_container}>
								<div className={ProfileCSS.stats_container}>
										<p>Defending </p>
										<p>20</p>	
								</div>
								<div className={ProfileCSS.stats_container}>
										<p>Dribbling </p>
										<p>20</p>	
								</div>
								<div className={ProfileCSS.stats_container}>
										<p>Pace </p>
										<p>20</p>	
								</div>
								<div className={ProfileCSS.stats_container}>
										<p>Physical </p>
										<p>20</p>	
								</div>
								<div className={ProfileCSS.stats_container}>
										<p>Passing </p>
										<p>20</p>	
								</div>
								<div className={ProfileCSS.stats_container}>
										<p>Shooting </p>
										<p>20</p>	
								</div>
								<div className={ProfileCSS.stats_container}>
										<p>Total </p>
										<p>20</p>	
								</div>
						</div>
					</div>
					
				</div>
			</div>
		</>
	);
}

export default Profile;
