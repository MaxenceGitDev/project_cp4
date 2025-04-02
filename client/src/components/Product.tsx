import "../styles/Product.css";

import { useState } from "react";



export default function Product({products}: ProductTypesProps ) {

const [selectedIndex, setSelectedIndex] = useState(0);
const [quantity, setQuantity] = useState(1);

const selectedProduct = products[selectedIndex];



const handleChange = (index: number) => {
    setSelectedIndex(index); 
  };

const decrement = () => {
	if (quantity > 1) {
		setQuantity(quantity - 1);
	}
};

const increment = () => {
	setQuantity(quantity + 1);
};

if (products.length === 0) return <p>Aucun produit à afficher</p>;



	return (
		<>
			<section className="section-product-container">
			<article className="title-section">
				<h1>Discover our natural gummies 🌿</h1>
				<h2>only natural ingredients</h2>
			</article>	
			<div className="main-product-container">
				<section className="product-container">
					<img src={selectedProduct.image_url} alt={selectedProduct.name}/>
					<div>
						<h3>{selectedProduct.name}</h3>
						<p className="desc">"{selectedProduct.description}"</p>
						<p className="number-gummies">Quantity : {selectedProduct.quantity} gummies</p>
						<ul>
              {products.map((product, index) => (
                <li
                  key={product.id}
                  onClick={() => handleChange(index)}
                  className={selectedIndex === index ? "selected" : ""}
                >
                  {product.name} : {product.description.split(" ")[0]}
                </li>
              ))}
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
					<p>Give your body and mind the best of nature with our <strong>100% natural</strong> gummies</p>
					<p>🧠 Focus – Sharpen your mind and enhance concentration.</p>
					<p>⚡ Energy Booster – Fuel your day with a natural energy boost.</p>
					<p>🌙 Sleep – Restful sleep with soothing botanical extracts. </p>
					<p>Made without artificial additives with delicious natural flavors, our gummies are the perfect healthy for your wellness routine.</p>
					<p className="p-align">Made with love 💚 by Wilder.</p>
				</section>
			</div>
			</section>
		</>
	);
}
