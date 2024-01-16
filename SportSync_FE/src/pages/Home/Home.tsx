import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleChevronRight,
	faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import EventCard from "../../components/EventCard/EventCard";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";

// CSS
import HomeCSS from "./Home.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import Event from "../../interfaces/Event";
import { useNavigate } from "react-router-dom";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Home({ onChangeUsername }: Props) {
	const navigate = useNavigate();

	const [recentEvents, setRecentEvents] = useState<Event[]>([]);
	const [popularEvents, setPopularEvents] = useState<Event[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(0);
	const [currentPopularPage, setCurrentPopularPage] = useState(0);

	useEffect(() => {
		const getRecentEvents = async () => {
			await axios
				.get("http://localhost:8090/events/api/recentevents")
				.then((response) => {
					setRecentEvents(response.data);
					setIsLoading(false);
				})
				.catch();
			setIsLoading(false);
		};

		getRecentEvents();

		const getPopularEvents = async () => {
			await axios
				.get("http://localhost:8090/events/api/popularevents")
				.then((response) => {
					setPopularEvents(response.data);
					setIsLoading(false);
				})
				.catch();
			setIsLoading(false);
		};

		getPopularEvents();
	}, []);

	if (isLoading) return null;

	const EVENTS_PER_PAGE = 3;

	const totalPages = Math.ceil(recentEvents.length / EVENTS_PER_PAGE);

	const totalPopularPages = Math.ceil(
		popularEvents.length / EVENTS_PER_PAGE
	);

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
			<div className={HomeCSS.page}>
				<Menu selectedPage="Home" onChangeUsername={onChangeUsername} />

				<div className={HomeCSS.content}>
					<div className={HomeCSS.container}>
						<div className={HomeCSS.title}>Recent Events</div>

						<div className={HomeCSS.page_container}>
							<div
								className={HomeCSS.arrow}
								onClick={handleLeftArrowClick}
							>
								<ArrowLeft
									sx={{ fontSize: "80px", color: "#969ab6" }}
								/>
							</div>

							<div className={HomeCSS.events_container}>
								{recentEvents.map((event, index) => {
									if (
										index >= currentPage * 3 &&
										index < (currentPage + 1) * 3
									) {
										return (
											<div
												className={HomeCSS.event_card}
												onClick={() => {
													navigate(
														"/event/" + event.id
													);
												}}
											>
												<EventCard event={event} />
											</div>
										);
									} else return null;
								})}
							</div>

							<div
								className={HomeCSS.arrow}
								onClick={handleRightArrowClick}
							>
								<ArrowRight
									sx={{ fontSize: "80px", color: "#969ab6" }}
								/>
							</div>
						</div>
					</div>

					<div className={HomeCSS.container}>
						<div className={HomeCSS.title}>Most Popular Events</div>

						<div className={HomeCSS.page_container}>
							<div
								className={HomeCSS.arrow}
								onClick={handlePopularLeftArrowClick}
							>
								<ArrowLeft
									sx={{ fontSize: "80px", color: "#969ab6" }}
								/>
							</div>

							{popularEvents.map((event, index) => {
									if (
										index >= currentPopularPage * 3 &&
										index < (currentPopularPage + 1) * 3
									) {
										return (
											<div
												className={HomeCSS.event_card}
												onClick={() => {
													navigate(
														"/event/" + event.id
													);
												}}
											>
												<EventCard event={event} />
											</div>
										);
									} else return null;
								})}

							<div
								className={HomeCSS.arrow}
								onClick={handlePopularRightArrowClick}
							>
								<ArrowRight
									sx={{ fontSize: "80px", color: "#969ab6" }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
