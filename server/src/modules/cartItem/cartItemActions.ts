import type { RequestHandler } from "express";
import cartItemRepository from "./cartItemRepository";
import cartRepository from "../cart/cartRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);
    const items = await cartItemRepository.readByCartId(cartId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    
    let cart = await cartRepository.readByUserId(userId);
    if (!cart) {
      const cartId = await cartRepository.create(userId);
      cart = { id: cartId, user_id: userId };
    }

    
    const existingItem = await cartItemRepository.findByCartAndProduct(cart.id, productId);
    if (existingItem) {
      await cartItemRepository.updateQuantity(existingItem.id, existingItem.quantity + quantity);
      res.status(200).json({ message: "Quantité mise à jour" });
    } else {
      const cartItem = { cart_id: cart.id, product_id: productId, quantity };
      const insertId = await cartItemRepository.create(cartItem);
      res.status(201).json({ id: insertId, ...cartItem });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    const affectedRows = await cartItemRepository.delete(itemId);
    if (affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, add, destroy };