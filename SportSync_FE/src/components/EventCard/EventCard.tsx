
// CSS
import EventCardCSS from "./EventCard.module.css";

// Icons
import { Place, Group, Sell, InsertInvitation } from "@mui/icons-material"

// Images
import Field from "../../images/field.png";

// Interfaces
import Event from "../../interfaces/Event";
import Entry from "../../interfaces/Entry";
import { useEffect, useState } from "react";

interface Props {
    event: Event;
}

function EventCard({ event }: Props) {
    const [members, setMembers] = useState<Entry[]>([]);

    useEffect(() => {
        const getMembers = async () => {
            await fetch("http://localhost:8090/entries/eventId=" + event.id)
                .then((response) => response.json())
                .then((data) => {
                    setMembers(data);
                })
                .catch();
        };

        getMembers();
    }, []);

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
                        {1 + members.length + "/" + event.maxPlayers}
                    </div>

                    <div className={EventCardCSS.text_left}>
                        <InsertInvitation />
                        {event.startDate + ", " + event.startTime.substring(0, event.startTime.lastIndexOf(":"))}
                    </div>

                    <div className={EventCardCSS.text_right}>
                        <Sell />
                        {event.price}
                    </div>
                </div>
            </div>
		</div>
	);
}

export default EventCard;
