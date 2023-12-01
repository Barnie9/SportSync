import { useNavigate } from "react-router-dom";

import "./style/Home.css";
import NavBar from "./NavBar";

function Home() {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("emailAddress");

		navigate("/login");
	};

	return (
		<>
			<NavBar selected="Home" />
			<h1>Home</h1>
		</>
	);
}

export default Home;
