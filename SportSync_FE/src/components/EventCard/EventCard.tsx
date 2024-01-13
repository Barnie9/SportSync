
// CSS
import EventCardCSS from "./EventCard.module.css";

// Icons
import { Place, Sell, InsertInvitation } from "@mui/icons-material"

// Images
import Field from "../../images/field.png";

// Interfaces
import Event from "../../interfaces/Event";

interface Props {
    event: Event;
}

function EventCard() {
	return (
		<div className={EventCardCSS.card}>
			<img src={Field} alt="Field" className={EventCardCSS.image} />
            
            <div className={EventCardCSS.content}>
                <div className={EventCardCSS.title}>
                    Barcelona - Real Madrid
                </div>

                <div className={EventCardCSS.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum.
                </div>

                <div className={EventCardCSS.container}>
                    <div className={EventCardCSS.text}>
                        <Place />
                        Barcelona, Spain
                    </div>

                    <div className={EventCardCSS.text}>
                        <Sell />
                        100
                    </div>

                    <div className={EventCardCSS.text}>
                        <InsertInvitation />
                        20.10.2024, 19:00
                    </div>
                </div>
            </div>
		</div>
	);
}

export default EventCard;
