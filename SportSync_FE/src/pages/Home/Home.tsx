import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleChevronRight,
	faCircleChevronLeft,

} from "@fortawesome/free-solid-svg-icons";
import EventCard from "../../components/EventCard/EventCard";

// CSS
import HomeCSS from "./Home.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import Event from "../../interfaces/Event";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Home({ onChangeUsername }: Props) {
	const [recentEvents, setRecentEvents] = useState<Event[]>([]);
	const [popularEvents, setPopularEvents] = useState<Event[]>([]);

	const [isLoading, setIsLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(0);
	const [currentPopularPage, setCurrentPopularPage] = useState(0);

	useEffect(() => {
		const getRecentEvents = async () => {
			await axios.get("http://localhost:8090/events/api/recentevents").then((response) =>{
				setRecentEvents(response.data)
				setIsLoading(false);

			}).catch()
			setIsLoading(false);
		};
		
		getRecentEvents();

		const getPopularEvents = async () => {
			await axios.get("http://localhost:8090/events/api/popularevents").then((response) =>{
			setPopularEvents(response.data);
			setIsLoading(false);
		}).catch()
			setIsLoading(false);
		};
		
		getPopularEvents();
	}, []);

	if (isLoading) return null;
	const EVENTS_PER_PAGE = 3;
	const POPULAR_EVENTS_PER_PAGE = 3;


	const totalPages = Math.ceil(recentEvents.length / EVENTS_PER_PAGE);
	const eventsToShow = recentEvents.slice(currentPage * EVENTS_PER_PAGE, (currentPage + 1) * EVENTS_PER_PAGE);

	const totalPopularPages = Math.ceil(popularEvents.length / POPULAR_EVENTS_PER_PAGE);

	const popularEventsToShow = popularEvents.slice(currentPopularPage * POPULAR_EVENTS_PER_PAGE, (currentPopularPage + 1) * POPULAR_EVENTS_PER_PAGE);
	const handlePopularLeftArrowClick = () => {
		setCurrentPopularPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handlePopularRightArrowClick = () => {
		setCurrentPopularPage((prevPage) => Math.min(prevPage + 1, totalPopularPages - 1));
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
				<div className={HomeCSS.container}>

			

					<div className={HomeCSS.recentEvents}>
						<div className={HomeCSS.rE_title}>
							<p>Recent Events</p>
						</div>

						<div className={HomeCSS.rE_content}>
							<div className={HomeCSS.rE_leftArrow}>
								<a onClick={handleLeftArrowClick}><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" /></a>
							</div>
							{eventsToShow.map(event =>( 
								    <EventCard key={event.id} event={event} />
								))}
							<div className={HomeCSS.rE_rightArrow}>
								<a onClick={handleRightArrowClick}><FontAwesomeIcon icon={faCircleChevronRight} size="2xl" /></a>
							</div>

						</div>


					</div>

					<div className={HomeCSS.popular}>
						<div className={HomeCSS.popular_title}>
							<p>Popular Right Now</p>
						</div>

						<div className={HomeCSS.popular_content}>

						<div className={HomeCSS.popular_leftArrow}>
								<a onClick={handlePopularLeftArrowClick}><FontAwesomeIcon icon={faCircleChevronLeft} size="2xl" /></a>
						</div>

						{popularEventsToShow.map(event =>( 
								    <EventCard key={event.id} event={event} />
								))}

						<div className={HomeCSS.popular_rightArrow}>
								<a onClick={handlePopularRightArrowClick}><FontAwesomeIcon icon={faCircleChevronRight} size="2xl" /></a>
						</div>

					</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
