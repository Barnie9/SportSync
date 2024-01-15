import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Icons
import { HomeRounded, EventRounded, LoginRounded, AccountCircle, ExpandMoreRounded, Circle, CircleOutlined, LogoutRounded } from '@mui/icons-material';

// Images
import Logo from "../../images/logo.png";

// CSS
import MenuCSS from "./Menu.module.css";

interface Props {
	selectedPage: string;
	onChangeUsername: (username: string) => void;
}

function Menu({ selectedPage, onChangeUsername }: Props) {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");

	useEffect(() => {
		onChangeUsername(localStorage.getItem("username") || "");
		setUsername(localStorage.getItem("username") || "");
	}, []);

	useEffect(() => {
		onChangeUsername(localStorage.getItem("username") || "");
		setUsername(localStorage.getItem("username") || "");
	}, [username]);

	const logout = () => {
		localStorage.clear();

		setUsername("");
		onChangeUsername("");

		navigate("/");
	};

	return (
		<>
			<div className={MenuCSS["menu"]}>
				<div className={MenuCSS["app_title"]}>
					<img
						src={Logo}
						alt="Logo"
						className={MenuCSS["app_title_logo"]}
					/>
					<div className={MenuCSS["app_title_text"]}>SportSync</div>
				</div>

				<div
					className={
						selectedPage === "Home"
							? MenuCSS["menu_item_selected"]
							: MenuCSS["menu_item"]
					}
					onClick={() => {
						navigate("/");
					}}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<HomeRounded />
					</div>
					<div className={MenuCSS["menu_item_text"]}>Home</div>
				</div>

				<div
					className={
						selectedPage === "Events"
							? MenuCSS["menu_item_selected"]
							: MenuCSS["menu_item"]
					}
					onClick={() => {
						navigate("/events");
					}}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<EventRounded />
					</div>
					<div className={MenuCSS["menu_item_text"]}>Events</div>
				</div>

				{username ? (
					<>
						<div
							className={MenuCSS["menu_item"]}
							onClick={() => {
								navigate("/profile");
							}}
						>
							<div className={MenuCSS["menu_item_icon"]}>
								<AccountCircle />
							</div>
							<div className={MenuCSS["menu_item_text"]}>
								<div className={MenuCSS["left_text"]}>
									{username}
								</div>
								<div className={MenuCSS["right_text"]}>
									<ExpandMoreRounded style={{ fontSize: 30 }} />
								</div>
							</div>
						</div>

						<div
							className={
								selectedPage === "Profile"
									? MenuCSS["submenu_item_selected"]
									: MenuCSS["submenu_item"]
							}
							onClick={() => {
								navigate("/profile");
							}}
						>
							<div className={MenuCSS["menu_item_icon"]}>
								{selectedPage === "Profile" ? (
									<Circle style={{ fontSize: 15 }} />
								) : (
									<CircleOutlined style={{ fontSize: 15 }} />
								)}
							</div>
							<div className={MenuCSS["menu_item_text"]}>
								Profile
							</div>
						</div>

						<div
							className={
								selectedPage === "My Events"
									? MenuCSS["submenu_item_selected"]
									: MenuCSS["submenu_item"]
							}
						>
							<div className={MenuCSS["menu_item_icon"]}>
							{selectedPage === "My Events" ? (
									<Circle style={{ fontSize: 15 }} />
								) : (
									<CircleOutlined style={{ fontSize: 15 }} />
								)}
							</div>
							<div className={MenuCSS["menu_item_text"]}>
								My Events
							</div>
						</div>

						<div className={MenuCSS["logout_container"]}>
							<div
								className={MenuCSS["logout_line"]}
								onClick={logout}
							>
								<div className={MenuCSS["logout_icon"]}>
									<LogoutRounded />
								</div>
								<div className={MenuCSS["logout_text"]}>
									Logout
								</div>
							</div>
						</div>
					</>
				) : (
					<div
						className={MenuCSS["menu_item"]}
						onClick={() => {
							navigate("/login");
						}}
					>
						<div className={MenuCSS["menu_item_icon"]}>
							<LoginRounded />
						</div>
						<div className={MenuCSS["menu_item_text"]}>Login</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Menu;
