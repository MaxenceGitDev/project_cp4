import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext"
import { getCart, removeCartItem } from "../services/requests";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";



export default function Cart() {

    
    const { user } = useAuth();
    const [ cart, setCart ] = useState<CartTypes | null >(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) {
                setError("You must be connected to see your cart");
                navigate("/login");
                return;
            }
            try {
                const cartData = await getCart();
                setCart(cartData);
            } catch (err) {
                setError((err as Error).message);
            }
        };
        fetchCart();
    }, [user]);

    const calculateTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const handleRemoveItem = async (itemId : number) => {
        try {
            await removeCartItem(itemId);
            setCart((prevCart) => prevCart && {
                ...prevCart,
                items: prevCart.items.filter((item) => item.id !== itemId),
            })
        } catch (err) {
            setError((err as Error).message)
        }
    };

    const svg = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>


    if (!user) return null;
    if (error) return <p>{error}</p>;
    if (!cart) return <p>Cart loading...</p>;
    if (cart.items.length === 0) return <p>Nothing to see here.</p>;

    return (
        <>
        <h1>Your cart</h1>
        <section className="cart-container">
        <article className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name}/>
              <p>{item.name}</p>
              <p>Qté: {item.quantity}</p>
              <p>Price: {item.price} €</p>
              <p>Total: {(item.quantity * item.price).toFixed(2)} €</p>
              <button type="button" className="delete-button" onClick={() => handleRemoveItem(item.id)}>{svg}</button>
            </div>
          ))}
        </article>
        <article className="cart-checkout"><p>Amount total : {calculateTotal().toFixed(2)} €</p>
        <button className="cart-button">Checkout</button>
        </article>
      </section>
        </>
    )
}