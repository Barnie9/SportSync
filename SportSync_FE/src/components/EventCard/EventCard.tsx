
// CSS
import EventCardCSS from "./EventCard.module.css";

// Icons
import { Place, Group, Sell, InsertInvitation } from "@mui/icons-material"

// Images
import Field from "../../images/field.png";

// Interfaces
import Event from "../../interfaces/Event";

interface Props {
    event: Event;
}

function EventCard({ event }: Props) {
	return (
		<div className={EventCardCSS.card}>
			<img src={Field} alt="Field" className={EventCardCSS.image} />
            
            <div className={EventCardCSS.content}>
                <div className={EventCardCSS.title}>
                    {event.title}
                </div>

                <div className={EventCardCSS.description}>
                    {event.description}
                </div>

                <div className={EventCardCSS.container}>
                    <div className={EventCardCSS.text_left}>
                        <Place />
                        {event.location}
                    </div>

                    <div className={EventCardCSS.text_right}>
                        <Group />
                        {event.maxPlayers}
                    </div>

                    <div className={EventCardCSS.text_left}>
                        <InsertInvitation />
                        {event.startDate + ", " + event.startTime.substring(0, event.startTime.lastIndexOf(":"))}
                    </div>

                    <div className={EventCardCSS.text_right}>
                        <Sell />
                        {event.price + "€"}
                    </div>
                </div>
            </div>
		</div>
	);
}

export default EventCard;
