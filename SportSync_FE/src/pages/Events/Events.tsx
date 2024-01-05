
// CSS
import EventsCSS from "./Events.module.css";

// Components
import Menu from "../../components/Menu/Menu";

function Events() {
	return (
		<>
			<div className={EventsCSS.page}>
				<Menu selectedPage="Events" />
			</div>
		</>
	);
}

export default Events;
