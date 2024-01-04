
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendarCheck, faUser, faAngleDown, faCircle as faCircleSolid, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'

import Logo from "../../images/logo.png";

// CSS
import MenuCSS from "./Menu.module.css";

function Menu() {
    return (
        <>
            <div className={MenuCSS["menu"]}>
                <div className={MenuCSS["app_title"]}>
                    <img src={Logo} alt="Logo" className={MenuCSS["app_title_logo"]} />
                    <div className={MenuCSS["app_title_text"]}>
                        SportSync
                    </div>
                </div>

                <div className={MenuCSS["menu_item"]}>
                    <div className={MenuCSS["menu_item_icon"]}>
                        <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div className={MenuCSS["menu_item_text"]}>
                        Home
                    </div>
                </div>

                <div className={MenuCSS["menu_item"]}>
                    <div className={MenuCSS["menu_item_icon"]}>
                        <FontAwesomeIcon icon={faCalendarCheck} />
                    </div>
                    <div className={MenuCSS["menu_item_text"]}>
                        Events
                    </div>
                </div>

                <div className={MenuCSS["menu_item"]}>
                    <div className={MenuCSS["menu_item_icon"]}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className={MenuCSS["menu_item_text"]}>
                        <div className={MenuCSS["left_text"]}>
                            Barnie
                        </div>
                        <div className={MenuCSS["right_text"]}>
                            <FontAwesomeIcon icon={faAngleDown} size="xs" />
                        </div>
                    </div>
                </div>

                <div className={MenuCSS["submenu_item"]}>
                    <div className={MenuCSS["menu_item_icon"]}>
                        <FontAwesomeIcon icon={faCircleSolid} size="xs" />
                    </div>
                    <div className={MenuCSS["menu_item_text"]}>
                        Profile
                    </div>
                </div>

                <div className={MenuCSS["submenu_item"]}>
                    <div className={MenuCSS["menu_item_icon"]}>
                        <FontAwesomeIcon icon={faCircleRegular} size="xs" />
                    </div>
                    <div className={MenuCSS["menu_item_text"]}>
                        My Stats
                    </div>
                </div>

                <div className={MenuCSS["submenu_item"]}>
                    <div className={MenuCSS["menu_item_icon"]}>
                        <FontAwesomeIcon icon={faCircleRegular} size="xs" />
                    </div>
                    <div className={MenuCSS["menu_item_text"]}>
                        My Events
                    </div>
                </div>

                <div className={MenuCSS["logout_container"]}>
                    <div className={MenuCSS["logout_line"]}>
                        <div className={MenuCSS["logout_icon"]}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                        </div>
                        <div className={MenuCSS["logout_text"]}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;
