import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Icons
import {
	CalendarMonth,
	Grass,
	LocationOn,
	People,
	Sell,
	WatchLater,
} from "@mui/icons-material";

// CSS
import EventPageCSS from "./EventPage.module.css";

// Images
import eventImage from "../../images/field.png";

import Menu from "../../components/Menu/Menu";
import Event from "../../interfaces/Event";
import Entry from "../../interfaces/Entry";

interface Props {
	onChangeUsername: (username: string) => void;
}

function EventPage({ onChangeUsername }: Props) {
	const navigate = useNavigate();
	const params = useParams();

	const [isLoading, setIsLoading] = useState(true);

	const [event, setEvent] = useState<Event>();
	const [eventMembers, setEventMembers] = useState<Entry[]>([]);

	const computeTime = (startTime: string, endTime: string) => {
		const start = startTime.split(":");
		const end = endTime.split(":");

		const startHour = parseInt(start[0]);
		const startMinute = parseInt(start[1]);

		const endHour = parseInt(end[0]);
		const endMinute = parseInt(end[1]);

		const hours = endHour - startHour;
		const minutes = endMinute - startMinute;

		return hours * 60 + minutes;
	};

	const handleJoin = () => {
		const username = localStorage.getItem("username");

		if (!username) {
			navigate("/login");
			return;
		}

		if (1 + eventMembers.length === event?.maxPlayers!) {
			alert("Event is full.");
			return;
		}

		if (username === event?.organizer.username) {
			alert("You are the organizer of this event.");
			return;
		}

		for (let i = 0; i < eventMembers.length; i++) {
			if (eventMembers[i].user.username === username) {
				alert("You are already a member of this event.");
				return;
			}
		}

		const createEntry = async () => {
			await axios
				.post("http://localhost:8090/entries", {
					eventId: event?.id,
					username: username,
				})
				.then(() => {
					alert("You have joined the event.");
					window.location.reload();
				})
				.catch(() => {
					alert("Failed to join the event.");
				});
		};

		createEntry();
	};

	const handleLeave = () => {
		const username = localStorage.getItem("username");

		const deleteEntry = async () => {
			await axios
				.delete(
					"http://localhost:8090/entries/eventId=" +
						event?.id +
						"&username=" +
						username
				)
				.then(() => {
					alert("You have left the event.");
					window.location.reload();
				})
				.catch(() => {
					alert("Failed to leave the event.");
				});
		};

		deleteEntry();
	}

	const verifyIfUserIsMember = () => {
		const username = localStorage.getItem("username");

		for (let i = 0; i < eventMembers.length; i++) {
			if (eventMembers[i].user.username === username) {
				return true;
			}
		}

		return false;
	};

	useEffect(() => {
		onChangeUsername(localStorage.getItem("username") || "");

		const getEventById = async () => {
			await axios
				.get("http://localhost:8090/events/id=" + params.id)
				.then((response) => {
					setEvent(response.data);
					setIsLoading(false);
				})
				.catch(() => {
					setEvent(undefined);
				});
		};

		const getEventMembers = async () => {
			await axios
				.get("http://localhost:8090/entries/eventId=" + params.id)
				.then((response) => {
					setEventMembers(response.data);
				})
				.catch();
		};

		getEventById();
		getEventMembers();
	}, []);

	if (isLoading)
		return (
			<div className={EventPageCSS.page}>
				<Menu
					selectedPage="Event"
					onChangeUsername={onChangeUsername}
				/>

				<div className={EventPageCSS.content}></div>
			</div>
		);

	return (
		<div className={EventPageCSS.page}>
			<Menu selectedPage="Event" onChangeUsername={onChangeUsername} />

			<div className={EventPageCSS.content}>
				{event ? (
					<div className={EventPageCSS.container}>
						<img
							src={eventImage}
							alt="Event"
							className={EventPageCSS.event_image}
						/>

						<div className={EventPageCSS.title_container}>
							<div className={EventPageCSS.date}>
								{event.startDate}
							</div>
							<div className={EventPageCSS.title}>
								{event.title}
							</div>
						</div>

						<div className={EventPageCSS.details_container}>
							<div className={EventPageCSS.left_container}>
								<div className={EventPageCSS.description_title}>
									Event Overview
								</div>
								<div className={EventPageCSS.description}>
									{event.description}
								</div>

								<div className={EventPageCSS.buttons_container}>
									{verifyIfUserIsMember() ? (
										<div
											className={EventPageCSS.button}
											onClick={handleLeave}
										>
											Leave
										</div>
									) : (
										<div
											className={EventPageCSS.button}
											onClick={handleJoin}
										>
											Join
										</div>
									)}
									<div
										className={EventPageCSS.button}
										onClick={() => {
											navigate("/members/" + event.id);
										}}
									>
										Members
									</div>
								</div>
							</div>

							<div className={EventPageCSS.right_container}>
								<div className={EventPageCSS.line}>
									<LocationOn fontSize="large" />
									&nbsp;&nbsp;
									{event.location}
								</div>
								<div className={EventPageCSS.line}>
									<CalendarMonth fontSize="large" />
									&nbsp;&nbsp;
									{event.startDate +
										", " +
										event.startTime.substring(
											0,
											event.startTime.lastIndexOf(":")
										)}
								</div>
								<div className={EventPageCSS.line}>
									<WatchLater fontSize="large" />
									&nbsp;&nbsp;
									{computeTime(
										event.startTime,
										event.endTime
									) + " minutes"}
								</div>
								<div className={EventPageCSS.line}>
									<Grass fontSize="large" />
									&nbsp;&nbsp;
									{event.fieldType}
								</div>
								<div className={EventPageCSS.line}>
									<Sell fontSize="large" />
									&nbsp;&nbsp;
									{event.price + " RON"}
								</div>
								<div className={EventPageCSS.line}>
									<People fontSize="large" />
									&nbsp;&nbsp;
									{1 +
										eventMembers.length +
										" / " +
										event.maxPlayers}
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className={EventPageCSS.not_found}>
						Event not found.
					</div>
				)}
			</div>
		</div>
	);
}

export default EventPage;
