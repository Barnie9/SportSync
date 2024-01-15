import EventMembersPageCSS from "./EventMembersPage.module.css";

import Menu from "../../components/Menu/Menu";
import { useState, useEffect } from "react";
import Entry from "../../interfaces/Entry";

import axios from "axios";
import { useParams } from "react-router-dom";
import User from "../../interfaces/User";
import Event from "../../interfaces/Event";

interface Props {
	onChangeUsername: (username: string) => void;
}

function EventMembersPage({ onChangeUsername }: Props) {
	const params = useParams();

	const [event, setEvent] = useState<Event>();
	const [eventMembers, setEventMembers] = useState<Entry[]>([]);

	const computeRating = (user: User | undefined) => {
		if (!user) {
			return 0;
		}

		return (
			user.rating.pace +
			user.rating.shooting +
			user.rating.passing +
			user.rating.dribbling +
			user.rating.defending +
			user.rating.physical
		);
	};

	const computeAge = (user: User | undefined) => {
		if (!user) {
			return 0;
		}

		const today = new Date();
		const birthDate = new Date(user.birthDate);

		let age = today.getFullYear() - birthDate.getFullYear();
		const month = today.getMonth() - birthDate.getMonth();

		if (
			month < 0 ||
			(month === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	};

	useEffect(() => {
		onChangeUsername(localStorage.getItem("username") || "");

		const getEventById = async () => {
			await axios
				.get("http://localhost:8090/events/id=" + params.id)
				.then((response) => {
					setEvent(response.data);
				})
				.catch();
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

	const renderUser = (user: User | undefined) => {
		return (
			<div className={EventMembersPageCSS.line}>
				<div className={EventMembersPageCSS.element}>
					{user?.username}
				</div>
				<div className={EventMembersPageCSS.element}>
					{computeAge(user)}
				</div>
				<div className={EventMembersPageCSS.element}>
					{user?.position || "Unknown"}
				</div>
				<div className={EventMembersPageCSS.element}>
					{user?.foot || "Unknown"}
				</div>
				<div className={EventMembersPageCSS.element}>
					{computeRating(user)}
				</div>
			</div>
		);
	};

	return (
		<>
			<div className={EventMembersPageCSS.page}>
				<Menu
					selectedPage="Event Members"
					onChangeUsername={onChangeUsername}
				/>

				<div className={EventMembersPageCSS.content}>
					<div className={EventMembersPageCSS.container}>
						<div className={EventMembersPageCSS.header}>
							<div className={EventMembersPageCSS.element}>
								Username
							</div>
							<div className={EventMembersPageCSS.element}>
								Age
							</div>
							<div className={EventMembersPageCSS.element}>
								Position
							</div>
							<div className={EventMembersPageCSS.element}>
								Foot
							</div>
							<div className={EventMembersPageCSS.element}>
								Rating
							</div>
						</div>

						{renderUser(event?.organizer)}

						{eventMembers.map((entry) => {
							const user = entry.user;

							return renderUser(user);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default EventMembersPage;
