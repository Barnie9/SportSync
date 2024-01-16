import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import CreateEventPageCSS from "./CreateEventPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
	onChangeUsername: (username: string) => void;
}

function CreateEventPage({ onChangeUsername }: Props) {
    const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [startDate, setStartDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [location, setLocation] = useState("");
	const [fieldType, setFieldType] = useState("");
	const [maxPlayers, setMaxPlayers] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");

	const handleSaveEvent = async () => {
		await axios
			.get(
				"http://localhost:8090/users/" +
					localStorage.getItem("username")
			)
			.then((response) => {
				const event = {
					id: null,
					organizer: response.data,
					title: title,
					startDate: startDate,
					startTime: startTime,
					endTime: endTime,
					location: location,
					fieldType: fieldType,
					maxPlayers: maxPlayers,
					price: price,
					description: description,
				};

				axios
					.post("http://localhost:8090/events", event)
					.then((response) => {
						alert("Event created successfully!");
                        window.location.reload();
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch();
	};

	return (
		<div className={CreateEventPageCSS.page}>
			<Menu
				selectedPage="Create Event"
				onChangeUsername={onChangeUsername}
			/>

			<div className={CreateEventPageCSS.content}>
				<div className={CreateEventPageCSS.container}>
					<div className={CreateEventPageCSS.title}>Create Event</div>

					<div className={CreateEventPageCSS.form_container}>
						<div className={CreateEventPageCSS.column}>
							<input
								type="text"
								placeholder="Title"
								className={CreateEventPageCSS.input}
								onChange={(e) => setTitle(e.target.value)}
							/>

							<input
								type="text"
								placeholder="Start Time"
								className={CreateEventPageCSS.input}
								onChange={(e) => setStartTime(e.target.value)}
							/>

							<input
								type="text"
								placeholder="Location"
								className={CreateEventPageCSS.input}
								onChange={(e) => setLocation(e.target.value)}
							/>

							<input
								type="text"
								placeholder="Max Players"
								className={CreateEventPageCSS.input}
								onChange={(e) => setMaxPlayers(e.target.value)}
							/>
						</div>

						<div className={CreateEventPageCSS.column}>
							<input
								type="date"
								placeholder="Start Date"
								className={CreateEventPageCSS.input}
								onChange={(e) => setStartDate(e.target.value)}
							/>

							<input
								type="text"
								placeholder="End Time"
								className={CreateEventPageCSS.input}
								onChange={(e) => setEndTime(e.target.value)}
							/>

							<input
								type="text"
								placeholder="Field Type"
								className={CreateEventPageCSS.input}
								onChange={(e) => setFieldType(e.target.value)}
							/>

							<input
								type="text"
								placeholder="Price"
								className={CreateEventPageCSS.input}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</div>

					<input
						type="text"
						placeholder="Description"
						className={CreateEventPageCSS.input}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<div className={CreateEventPageCSS.button} onClick={handleSaveEvent} >Save Event</div>
				</div>
			</div>
		</div>
	);
}

export default CreateEventPage;
