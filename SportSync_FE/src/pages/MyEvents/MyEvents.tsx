// CSS
import MyEventsCSS from "./MyEvents.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import Event from "../../interfaces/Event";
import { useState, useEffect } from "react";

import { AddCircle, ArrowLeft, ArrowRight } from "@mui/icons-material";
import EventCard from "../../components/EventCard/EventCard";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../../interfaces/User";
import Entry from "../../interfaces/Entry";

interface Props {
	onChangeUsername: (username: string) => void;
}

function MyEvents({ onChangeUsername }: Props) {
	const navigate = useNavigate();

	const [createdByUserEvents, setCreatedByUserEvents] = useState<Event[]>([]);
	const [joinedEvents, setJoinedEvents] = useState<Entry[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(0);
	const [currentPopularPage, setCurrentPopularPage] = useState(0);

	useEffect(() => {
		const getCreatedByUserEvents = async () => {
			await axios
				.get(
					"http://localhost:8090/events/createdBy=" +
						localStorage.getItem("username")
				)
				.then((response) => {
					setCreatedByUserEvents(response.data);
					setIsLoading(false);
				})
				.catch();
			setIsLoading(false);
		};

		getCreatedByUserEvents();

		const getPopularEvents = async () => {
			await axios
				.get(
					"http://localhost:8090/entries/username=" +
						localStorage.getItem("username")
				)
				.then((response) => {
					setJoinedEvents(response.data);
					setIsLoading(false);
				})
				.catch();
			setIsLoading(false);
		};

		getPopularEvents();
	}, []);

	if (isLoading) return null;
	const EVENTS_PER_PAGE = 3;

	const totalPages = Math.ceil(createdByUserEvents.length / EVENTS_PER_PAGE);

	const totalPopularPages = Math.ceil(joinedEvents.length / EVENTS_PER_PAGE);

	const handlePopularLeftArrowClick = () => {
		setCurrentPopularPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handlePopularRightArrowClick = () => {
		setCurrentPopularPage((prevPage) =>
			Math.min(prevPage + 1, totalPopularPages - 1)
		);
	};

	const handleLeftArrowClick = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handleRightArrowClick = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
	};

	return (
		<>
			<div className={MyEventsCSS.page}>
				<Menu selectedPage="My Events" onChangeUsername={onChangeUsername} />

				<div className={MyEventsCSS.content}>
					<div className={MyEventsCSS.container}>
                        <div className={MyEventsCSS.title_container}>
						<div className={MyEventsCSS.title}>Created By You</div>
                        <div className={MyEventsCSS.button} onClick={() => navigate("/create-event")}>
                            <AddCircle sx={{ marginRight: "10px" }} />
                            Add Event</div>
                        </div>

						<div className={MyEventsCSS.page_container}>
							{createdByUserEvents.length === 0 ? (
								<div className={MyEventsCSS.no_events}>
									You have not created any events yet
								</div>
							) : (
								<>
									<div
										className={MyEventsCSS.arrow}
										onClick={handleLeftArrowClick}
									>
										<ArrowLeft
											sx={{
												fontSize: "80px",
												color: "#969ab6",
											}}
										/>
									</div>

									<div
										className={MyEventsCSS.events_container}
									>
										{createdByUserEvents.map(
											(event, index) => {
												if (
													index >= currentPage * 3 &&
													index <
														(currentPage + 1) * 3
												) {
													return (
														<div
															className={
																MyEventsCSS.event_card
															}
															onClick={() => {
																navigate(
																	"/event/" +
																		event.id
																);
															}}
														>
															<EventCard
																event={event}
															/>
														</div>
													);
												} else return null;
											}
										)}
									</div>

									<div
										className={MyEventsCSS.arrow}
										onClick={handleRightArrowClick}
									>
										<ArrowRight
											sx={{
												fontSize: "80px",
												color: "#969ab6",
											}}
										/>
									</div>
								</>
							)}
						</div>
					</div>

					<div className={MyEventsCSS.container}>
                    <div className={MyEventsCSS.title_container}>
						<div className={MyEventsCSS.title}>Joined Events</div>
                        </div>

						<div className={MyEventsCSS.page_container}>
							{joinedEvents.length === 0 ? (
								<div className={MyEventsCSS.no_events}>
									You have not joined any events yet
								</div>
							) : (
								<>
									<div
										className={MyEventsCSS.arrow}
										onClick={handlePopularLeftArrowClick}
									>
										<ArrowLeft
											sx={{
												fontSize: "80px",
												color: "#969ab6",
											}}
										/>
									</div>

									<div
										className={MyEventsCSS.events_container}
									>
										{joinedEvents.map((entry, index) => {
											if (
												index >=
													currentPopularPage * 3 &&
												index <
													(currentPopularPage + 1) * 3
											) {
												return (
													<div
														className={
															MyEventsCSS.event_card
														}
														onClick={() => {
															navigate(
																"/event/" +
																	entry.event
																		.id
															);
														}}
													>
														<EventCard
															event={entry.event}
														/>
													</div>
												);
											} else return null;
										})}
									</div>

									<div
										className={MyEventsCSS.arrow}
										onClick={handlePopularRightArrowClick}
									>
										<ArrowRight
											sx={{
												fontSize: "80px",
												color: "#969ab6",
											}}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MyEvents;
