import "../styles/Product.css";
import green from "../assets/images/image_cp4.png";
import yellow from "../assets/images/image2_cp4.png";
import purple from "../assets/images/image3_cp4.png";
import { useState } from "react";

const box = {

	brand: "Wilder",
	number: 60,
	price: 19.99,
	pictures: [ green, yellow, purple],
	desc: ["Focus & Concentration for long hours of code", "Boost & Energy to win the Hackaton and beat every bugs", "Relax & Sleep after long day of git reset --hard"],
	name: ["ZEN CODE", "HARD CODE", "SLEEP CODE"]
}

export default function Product() {

const [img, setImg] = useState(box.pictures[0]);
const [name, setName] = useState(box.name[0]);
const [ desc, setDesc] = useState(box.desc[0]);
const [selectedIndex, setSelectedIndex] = useState(0);
const [quantity, setQuantity] = useState(1);


const handleChange = (index: number) => {
    setImg(box.pictures[index]);
    setName(box.name[index]);
    setDesc(box.desc[index]);
    setSelectedIndex(index); 
  };

const decrement = () => {
	if (quantity > 1 && quantity > 0) {
		setQuantity(quantity - 1);
	}
};

const increment = () => {
	setQuantity(quantity + 1);
};



	return (
		<>
			<section className="section-product-container">
			<article className="title-section">
				<h1>Discover our fabulous gummies</h1>
				<h2>only natural ingredients</h2>
			</article>	
			<div className="main-product-container">
				<section className="product-container">
					<img src={img} alt="green gummies"/>
					<div>
						<h3>{name}</h3>
						<p className="desc">"{desc}"</p>
						<p className="number-gummies">Quantity : {box.number} gummies</p>
					<ul>
						<li onClick={() => handleChange(0)} className={selectedIndex === 0 ? "selected" : ""}>Zen Code : Focus</li>
						<li onClick={() => handleChange(1)} className={selectedIndex === 1 ? "selected" : "" }>Hard Code : Energy</li>
						<li onClick={() => handleChange(2)} className={selectedIndex === 2 ? "selected" : "" }>Sleep Code : Sleep</li>

					</ul>
					<div className="quantity-container">
					<button type="button" onClick={decrement}>-</button>
					<span>{quantity}</span>
					<button type="button" onClick={increment}>+</button>
					</div>

					<button className="buy-button" type="button">Add to cart</button>
					</div>
				</section>
				<section className="desc-product-container">
					<h3>Descrpition</h3>
				</section>
			</div>
			</section>
		</>
	);
}
