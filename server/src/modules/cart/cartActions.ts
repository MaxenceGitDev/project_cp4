import type { RequestHandler } from "express";
import cartRepository from "./cartRepository";
import cartItemRepository from "../cartItem/cartItemRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const carts = await cartRepository.readAll();
    res.json(carts);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const cartId = Number(req.params.id);
    const cart = await cartRepository.read(cartId);
    if (!cart) res.sendStatus(404);
    else res.json(cart);
  } catch (err) {
    next(err);
  }
};

// const add: RequestHandler = async (req, res, next) => {
//   try {
//     const userId = req.body.userId;
//     const insertId = await cartRepository.create(userId);
//     res.status(201).json({ id: insertId, user_id: userId });
//   } catch (err) {
//     next(err);
//   }
// };

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Utilisateur non authentifié" });
      return;
    }

    const existingCart = await cartRepository.readByUserId(userId);
    if (existingCart) {
      res.json(existingCart);
      return;
    }

    const insertId = await cartRepository.create(userId);
    res.status(201).json({ id: insertId, user_id: userId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const cartId = Number(req.params.id);
    const affectedRows = await cartRepository.delete(cartId);
    if (affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const getUserCart: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      res.status(401).json({ message: "User not identified" });
      return;
    }

   
    const cart = await cartRepository.readByUserId(userId);
    if (!cart) {
      res.status(404).json({ id: null, user_id: userId, items: [] });
      return;
    }


    const items = await cartItemRepository.readByCartIdWithProducts(cart.id);

    const cartWithItems = { ...cart, items };
    res.json(cartWithItems);
  } catch (err) {
    console.error(`Erreur dans getUserCart pour ${req.user?.id}`, err);
    next(err);
  }
};

export default { browse, read, add, destroy, getUserCart };