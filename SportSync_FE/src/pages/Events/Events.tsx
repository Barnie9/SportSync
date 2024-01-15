import { useEffect, useState } from "react";
import axios from "axios";

// Dayjs
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// CSS
import EventsCSS from "./Events.module.css";

// Components
import Menu from "../../components/Menu/Menu";
import EventCard from "../../components/EventCard/EventCard";

// Icons
import {
	KeyboardArrowLeftRounded,
	KeyboardArrowRightRounded,
	KeyboardDoubleArrowLeftRounded,
	KeyboardDoubleArrowRightRounded,
} from "@mui/icons-material";
import Event from "../../interfaces/Event";
import { useNavigate } from "react-router-dom";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Events({ onChangeUsername }: Props) {
	const navigate = useNavigate();

	const currentDate = new Date();

	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
		dayjs(currentDate)
	);

	const [pages, setPages] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const getEventsByStartDate = async () => {
			await axios
				.get(
					"http://localhost:8090/events/startDate=" +
						selectedDate?.format("YYYY-MM-DD")
				)
				.then((response) => {
					setEvents(response.data);
				})
				.catch();
		};

		getEventsByStartDate();
	}, [selectedDate]);

	useEffect(() => {
		const nrOfPages = Math.ceil(events.length / 9);
		const tempPages = [];

		for (let i = 0; i < nrOfPages; i++) {
			tempPages.push(i);
		}

		setPages(tempPages);
	}, [events]);

	useEffect(() => {
		setCurrentPage(0);
	}, [pages]);

	useEffect(() => {
		// setCurrentPage(pages[0]);
	}, [currentPage]);

	return (
		<>
			<div className={EventsCSS.page}>
				<Menu
					selectedPage="Events"
					onChangeUsername={onChangeUsername}
				/>

				<div className={EventsCSS.content}>
					<div className={EventsCSS.header}>
						<div className={EventsCSS.title}>All Events</div>
						<div className={EventsCSS.datepicker}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									sx={{
										"& .MuiOutlinedInput-notchedOutline": {
											border: "none",
										},
										width: "150px",
										"& .MuiInputBase-input": {
											color: "#ffffff", // Change this to the desired text color
										},
										"& .MuiIconButton-root": {
											color: "#ffffff", // Change this to the desired icon color
										},
									}}
									value={selectedDate}
									onChange={(newSelectedDate) => {
										setSelectedDate(newSelectedDate);
									}}
								/>
							</LocalizationProvider>
						</div>
					</div>

					{events.length === 0 ? (
						<div className={EventsCSS.no_events}>
							No events found
						</div>
					) : (
						<>
							<div className={EventsCSS.events_container}>
								{events.map((event, index) => {
									if (
										index >= currentPage * 9 &&
										index < (currentPage + 1) * 9
									) {
										return (
											<div
												className={EventsCSS.event_card}
												onClick={() => {
													navigate(
														"/event/" + event.id
													);
												}}
											>
												<EventCard event={event} />
											</div>
										);
									}
								})}
							</div>

							<div className={EventsCSS.footer}>
								<div className={EventsCSS.pagination}>
									<div
										className={EventsCSS.element}
										onClick={() => setCurrentPage(pages[0])}
									>
										<KeyboardDoubleArrowLeftRounded />
									</div>
									<div
										className={EventsCSS.element}
										onClick={() => {
											if (currentPage > 0) {
												setCurrentPage(currentPage - 1);
											}
										}}
									>
										<KeyboardArrowLeftRounded />
									</div>

									{pages.map((page) => {
										return (
											<div
												className={
													page === currentPage
														? EventsCSS.selected_element
														: EventsCSS.element
												}
												onClick={() =>
													setCurrentPage(page)
												}
											>
												{page + 1}
											</div>
										);
									})}

									<div
										className={EventsCSS.element}
										onClick={() => {
											if (
												currentPage <
												pages.length - 1
											) {
												setCurrentPage(currentPage + 1);
											}
										}}
									>
										<KeyboardArrowRightRounded />
									</div>
									<div
										className={EventsCSS.element}
										onClick={() =>
											setCurrentPage(pages.length - 1)
										}
									>
										<KeyboardDoubleArrowRightRounded />
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Events;
