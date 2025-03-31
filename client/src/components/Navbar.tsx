import "../styles/Navbar.css";

export default function Navbar() {
	return (
		<>
			<nav>
				<ul className="link-container">
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/Login">Login</a>
					</li>
					<li>
						<a href="/Cart">Cart</a>
					</li>
				</ul>
			</nav>
		</>
	);
}
