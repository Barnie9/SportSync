import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

// Pages
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import EmailConfirmation from "./pages/EmailConfirmation/EmailConfirmation";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";

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
