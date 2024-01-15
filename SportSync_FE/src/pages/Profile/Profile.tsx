import { useState, useEffect } from "react";

// CSS
import ProfileCSS from "./Profile.module.css";

// Components
import Menu from "../../components/Menu/Menu";

interface Props {
	onChangeUsername: (username: string) => void;
}

function Profile({ onChangeUsername }: Props) {
	const [username, setUsername] = useState(
		localStorage.getItem("username") || ""
	);
	useEffect(() => {
        setUsername(localStorage.getItem("username") || "");
        onChangeUsername(username);
    }, []);
	return (
		<>
			<div className={ProfileCSS.page}>
				<Menu selectedPage="Profile" onChangeUsername={onChangeUsername} />

				<div className={ProfileCSS.content}>
					<div className={ProfileCSS.container}>
						<div className={ProfileCSS.left_column}>
							<div className={ProfileCSS.title}>Profile</div>

							<div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

							<div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

                            <div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

                            <div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

                            <div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

                            <div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

                            <div className={ProfileCSS.item}>
								<div className={ProfileCSS.label}>
									First Name:
								</div>
								<input
									className={ProfileCSS.input}
									placeholder="Ceva"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</div>

						</div>
						<div className={ProfileCSS.right_column}></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
