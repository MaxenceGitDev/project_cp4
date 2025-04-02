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
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/cart">Cart</a>
					</li>
				</ul>
			</nav>
		</>
	);
}
