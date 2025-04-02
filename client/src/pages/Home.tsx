
import { useLoaderData } from "react-router-dom";
import Product from "../components/Product";
import "../styles/Home.css";

export default function Home() {

	const { products } = useLoaderData() as { products: ProductTypes[] };
	

	return (
		<>
			<section className="home-bg">
				<video autoPlay muted loop playsInline>
					<source src="/bg_video.mp4" type="video/mp4" />
					Votre navigateur ne supporte pas la vidéo.
				</video>
				<article className="home-title">
					<h1>Welcome on Wilder.</h1>
					<h2>Scroll to discover</h2>
				</article>
			</section>
			<section className="home-content">
				<Product products={products} />
			</section>
		</>
	);
}
