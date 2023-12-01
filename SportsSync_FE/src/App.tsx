import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Events from "./components/Events";
import EmailConfirmation from "./components/EmailConfirmation";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/events" element={<Events />} />

					<Route path="/login" element={<Login />} />

					<Route path="/register" element={<Register />} />

					<Route
						path="/confirm-email/:token"
						element={<EmailConfirmation />}
					/>

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
