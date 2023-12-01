import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// CSS
import EmailConfirmationCSS from "./EmailConfirmation.module.css";

function EmailComfirmation() {
	const navigate = useNavigate();

	const params = useParams();

	const [message, setMessage] = useState("Waiting for confirmation...");

	useEffect(() => {
		const confirmEmail = async () => {
			try {
				await axios.post("http://localhost:8090/confirm-email", {
					token: params.token,
				});

				setMessage(
					"Your email has been confirmed. You will be redirected to the login page shortly."
				);

				setTimeout(() => {
					navigate("/login");
				}, 5000);
			} catch (error: any) {
				if (error.response.data === "Invalid token") {
					setMessage("Email confirmation token is invalid.");

					setTimeout(() => {
						navigate("/register");
					}, 5000);
				} else if (error.response.data === "Email already confirmed") {
					setMessage(
						"Email already confirmed. You will be redirected to the login page shortly."
					);

					setTimeout(() => {
						navigate("/login");
					}, 5000);
				} else if (error.response.data === "Expired token") {
					setMessage("Email confirmation token has expired.");
				}
			}
		};

		confirmEmail();
	}, [navigate, params]);

	const handleGenerateNewToken = async () => {
		try {
			await axios.post(
				"http://localhost:8090/generate-new-email-confirmation-token",
				{ token: params.token }
			);

			setMessage(
				"New email confirmation token generated. Please check your email again."
			);

			setTimeout(() => {
				navigate("/login");
			}, 5000);
		} catch (error: any) {
			alert(error.response.data);
		}
	};

	const handleRegister = () => {
		navigate("/register");
	};

	return (
		<Box className={EmailConfirmationCSS.background}>
			<Grid
				container
				xs={10}
				md={8}
				className={EmailConfirmationCSS.container}
			>
				<Grid item xs={12} className={EmailConfirmationCSS.item}>
					<p className={EmailConfirmationCSS.message}>{message}</p>
				</Grid>

				{message === "Email confirmation token has expired." ? (
					<>
						<Grid
							item
							xs={12}
							md={6}
							className={EmailConfirmationCSS.item}
						>
							<button
								className={EmailConfirmationCSS.button}
								onClick={handleGenerateNewToken}
							>
								Generate new token
							</button>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							className={EmailConfirmationCSS.item}
						>
							<button
								className={EmailConfirmationCSS.button}
								onClick={handleRegister}
							>
								Register
							</button>
						</Grid>
					</>
				) : null}
			</Grid>
		</Box>
	);
}

export default EmailComfirmation;
