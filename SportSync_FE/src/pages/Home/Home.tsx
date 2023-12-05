import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// CSS
import HomeCSS from "./Home.module.css";

// Components
import NavBar from "../../components/NavBar/NavBar";

function Home() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);

	const [username, setUsername] = useState("");
	const [profilePicturePath, setProfilePicturePath] = useState("");

	const logout = () => {
		localStorage.removeItem("emailAddress");

		navigate("/login");
	};

	useEffect(() => {
		if (!localStorage.getItem("emailAddress")) {
			setIsLoading(false);
		} else {
			const getUser = async () => {
				await axios.get(
					"http://localhost:8090/users/" +
						localStorage.getItem("emailAddress")
				).then((response) => {
					setUsername(response.data[0]);
					setProfilePicturePath(response.data[1]);

					setIsLoading(false);
				});
			};

			getUser();
		}
	}, []);

	if (isLoading) return null;

	return (
		<>
			<div className={HomeCSS.page}>
				<NavBar
					selected="Home"
					username={username}
					profilePicturePath={profilePicturePath}
				/>
				<h1>{username}</h1>
			</div>
		</>
	);
}

export default Home;
