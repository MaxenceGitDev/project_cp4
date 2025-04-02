import type { RequestHandler } from "express";
import productRepository from "./productRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const products = await productRepository.readAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await productRepository.read(productId);
    if (!product) res.sendStatus(404);
    else res.json(product);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const product = { id: Number(req.params.id), ...req.body };
    const affectedRows = await productRepository.update(product);
    if (affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const product = req.body;
    const insertId = await productRepository.create(product);
    res.status(201).json({ id: insertId, ...product });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const affectedRows = await productRepository.delete(productId);
    if (affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };