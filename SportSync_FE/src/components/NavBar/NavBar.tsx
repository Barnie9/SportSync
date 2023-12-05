import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

// CSS
import NavBarCSS from "./NavBar.module.css";

// Images
import Logo from "../../images/logo.png";

function NavBar(props: {
	selected: string;
	username: string;
	profilePicturePath: string;
}) {
	const navigate = useNavigate();

	const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: any) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsAccountDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("emailAddress");

		console.log("Logged out: " + localStorage.getItem("emailAddress"));

		navigate("/login");
	};

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
			<div className={NavBarCSS.up}>
				<div className={NavBarCSS.left}>
					<img src={Logo} alt="Logo" className={NavBarCSS.logo} />
					<div className={NavBarCSS.app_title}>SportSync</div>
				</div>
				<div className={NavBarCSS.right}>
					{localStorage.getItem("emailAddress") ? (
						<div className={NavBarCSS.account} ref={dropdownRef}>
							<button
								className={NavBarCSS.account_button}
								onClick={() =>
									setIsAccountDropdownOpen(
										!isAccountDropdownOpen
									)
								}
							>
								<img
									src={
										props.profilePicturePath
											? require("../../images/" +
													props.profilePicturePath)
											: require("../../images/account.png")
									}
									alt="Acc"
									className={NavBarCSS.account_picture}
								/>
								<div className={NavBarCSS.account_name}>
									{props.username !== ""
										? props.username
										: "Account"}
								</div>
								<FontAwesomeIcon
									icon={faAngleDown}
									size="xl"
									className={NavBarCSS.arrow}
								/>
							</button>

							{isAccountDropdownOpen ? (
								<div
									className={NavBarCSS.dropdown}
									id="dropdown"
								>
									<a className={NavBarCSS.dropdown_item}>
										Profile
									</a>
									<a className={NavBarCSS.dropdown_item}>
										My Stats
									</a>
									<a className={NavBarCSS.dropdown_item}>
										My Events
									</a>
									<a
										className={NavBarCSS.dropdown_item}
										onClick={handleLogout}
									>
										Logout
									</a>
								</div>
							) : null}
						</div>
					) : (
						<button
							className={NavBarCSS.login_button}
							onClick={() => goTo("login")}
						>
							Login
							<FontAwesomeIcon
								icon={faRightToBracket}
								className={NavBarCSS.icon}
							/>
						</button>
					)}
				</div>
			</div>

			<div className={NavBarCSS.down}>
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
			</div>
		</>
	);
}

export default NavBar;
