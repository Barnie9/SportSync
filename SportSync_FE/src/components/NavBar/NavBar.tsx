import { useNavigate } from "react-router-dom";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// CSS
import NavBarCSS from "./NavBar.module.css";

// Images
import Logo from "../../images/logo.png";

function NavBar(props: { selected: string }) {
	const navigate = useNavigate();

	const goTo = (path: string) => {
		navigate("/" + path);
	};

	const goToHome = () => {
		navigate("/home");
	};

	const goToEvents = () => {
		navigate("/events");
	};

	return (
		<>
			<Box
				sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
				className={NavBarCSS.background}
			>
				<Box className={NavBarCSS.up}>
					<Grid container md={10} className={NavBarCSS.left}>
						<img src={Logo} alt="Logo" className={NavBarCSS.logo} />
						<p className={NavBarCSS.app_title}>SportSync</p>
					</Grid>
					<Grid container md={2} className={NavBarCSS.right}>
						<img src={Logo} alt="Logo" className={NavBarCSS.logo} />
					</Grid>
				</Box>

				<Box className={NavBarCSS.down}>
					<button
						className={
							props.selected === "Home"
								? NavBarCSS.selected_button
								: NavBarCSS.button
						}
						onClick={goToHome}
					>
						Home
					</button>
					<button
						className={
							props.selected === "Events"
								? NavBarCSS.selected_button
								: NavBarCSS.button
						}
						onClick={goToEvents}
					>
						Events
					</button>
				</Box>
			</Box>

			<Box
				sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
				className={NavBarCSS.background}
			>
				<Box className={NavBarCSS.up}>
					<Grid container xs={10} className={NavBarCSS.left}>
						<img src={Logo} alt="Logo" className={NavBarCSS.logo} />
						<p className={NavBarCSS.app_title}>SportSync</p>
					</Grid>
					<Grid container xs={2} className={NavBarCSS.right}>
						<img src={Logo} alt="Logo" className={NavBarCSS.logo} />
					</Grid>
				</Box>

				<Box className={NavBarCSS.down}>
					<select
						className={NavBarCSS.select}
						onChange={(event) => goTo(event.target.value)}
					>
						{props.selected === "Home" ? (
							<option selected hidden>
								Home
							</option>
						) : (
							<option value="home">Home</option>
						)}
						{props.selected === "Events" ? (
							<option selected hidden>
								Events
							</option>
						) : (
							<option value="events">Events</option>
						)}
					</select>
				</Box>
			</Box>
		</>
	);
}

export default NavBar;
