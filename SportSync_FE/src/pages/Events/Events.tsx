
// CSS
import EventsCSS from "./Events.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import EventCard from "../../components/EventCard/EventCard";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Events({ onChangeUsername }: Props) {
	return (
		<>
			<div className={EventsCSS.page}>
				<Menu selectedPage="Events" onChangeUsername={onChangeUsername} />

				<div className={EventsCSS.container}>
					<div className={EventsCSS.title}>
						All Events
					</div>

					<div className={EventsCSS.events_container}>
						<EventCard />
						<EventCard />
						<EventCard />
						<EventCard />
						<EventCard />
						<EventCard />
						<EventCard />
						<EventCard />
					</div>
				</div>
			</div>
		</>
	);
}

export default Events;
