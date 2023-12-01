import { useNavigate } from "react-router-dom";

// CSS
import HomeCSS from "./Home.module.css";

// Components
import NavBar from "../../components/NavBar/NavBar";

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
