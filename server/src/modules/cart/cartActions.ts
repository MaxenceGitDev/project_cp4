import type { RequestHandler } from "express";
import cartRepository from "./cartRepository";

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

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.body.userId;
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

export default { browse, read, add, destroy };