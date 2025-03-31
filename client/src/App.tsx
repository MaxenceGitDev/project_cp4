import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
	return (
		<>
			<header className="fixed-navbar">
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
