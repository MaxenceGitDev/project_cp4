import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import userActions from "./modules/user/userActions";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/:id", userActions.destroy);

import productActions from "./modules/product/productActions";

router.get("/api/products", productActions.browse);
router.get("/api/products/:id", productActions.read);
router.post("/api/products", productActions.add);
router.put("/api/products/:id", productActions.edit);
router.delete("/api/products/:id", productActions.destroy);

import cartActions from "./modules/cart/cartActions";

router.get("/api/carts", cartActions.browse);
router.get("/api/carts/:id", cartActions.read);
router.post("/api/carts", cartActions.add);
router.delete("/api/carts/:id", cartActions.destroy);

import cartItemActions from "./modules/cartItem/cartItemActions";

router.get("/api/cart-items/:cartId", cartItemActions.browse); // Liste les items d’un panier
router.post("/api/cart-items/add", cartItemActions.add); // Ajoute un article
router.delete("/api/cart-items/:id", cartItemActions.destroy); // Supprime un article

/* ************************************************************************* */

export default router;
