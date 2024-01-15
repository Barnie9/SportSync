import { useNavigate } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faCalendarCheck,
	faUser,
	faAngleDown,
	faCircle as faCircleSolid,
	faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";

// Images
import Logo from "../../images/logo.png";

// CSS
import MenuCSS from "./Menu.module.css";

function Menu(props: { selectedPage: string }) {
	const navigate = useNavigate();

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
						props.selectedPage === "Home"
							? MenuCSS["menu_item_selected"]
							: MenuCSS["menu_item"]
					}
					onClick={() => {
						navigate("/");
					}}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<FontAwesomeIcon icon={faHouse} />
					</div>
					<div className={MenuCSS["menu_item_text"]}>Home</div>
				</div>

				<div
					className={
						props.selectedPage === "Events"
							? MenuCSS["menu_item_selected"]
							: MenuCSS["menu_item"]
					}
					onClick={() => {
						navigate("/events");
					}}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<FontAwesomeIcon icon={faCalendarCheck} />
					</div>
					<div className={MenuCSS["menu_item_text"]}>Events</div>
				</div>

				<div
					className={MenuCSS["menu_item"]}
					onClick={() => {
						navigate("/profile");
					}}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<FontAwesomeIcon icon={faUser} />
					</div>
					<div className={MenuCSS["menu_item_text"]}>
						<div className={MenuCSS["left_text"]}>Barnie</div>
						<div className={MenuCSS["right_text"]}>
							<FontAwesomeIcon icon={faAngleDown} size="xs" />
						</div>
					</div>
				</div>

				<div
					className={
						props.selectedPage === "Profile"
							? MenuCSS["submenu_item_selected"]
							: MenuCSS["submenu_item"]
					}
					onClick={() => {
						navigate("/profile");
					}}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<FontAwesomeIcon
							icon={
								props.selectedPage === "Profile"
									? faCircleSolid
									: faCircleRegular
							}
							size="xs"
						/>
					</div>
					<div className={MenuCSS["menu_item_text"]}>Profile</div>
				</div>

				<div
					className={
						props.selectedPage === "My Events"
							? MenuCSS["submenu_item_selected"]
							: MenuCSS["submenu_item"]
					}
				>
					<div className={MenuCSS["menu_item_icon"]}>
						<FontAwesomeIcon
							icon={
								props.selectedPage === "My Events"
									? faCircleSolid
									: faCircleRegular
							}
							size="xs"
						/>
					</div>
					<div className={MenuCSS["menu_item_text"]}>My Events</div>
				</div>

				<div className={MenuCSS["logout_container"]}>
					<div className={MenuCSS["logout_line"]}>
						<div className={MenuCSS["logout_icon"]}>
							<FontAwesomeIcon
								icon={faArrowRightFromBracket}
								size="xl"
							/>
						</div>
						<div className={MenuCSS["logout_text"]}>Logout</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Menu;
