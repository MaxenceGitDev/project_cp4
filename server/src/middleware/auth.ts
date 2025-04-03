import userRepository from "../modules/user/userRepository";
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

const verify: RequestHandler = async (req, res, next) => {
    if (!process.env.APP_SECRET) {
      throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
    }
  
    try {
      const { auth } = req.cookies;
  
      if (!auth) {
        res.sendStatus(403);
        return;
      }
  
      const resultPayload = jwt.verify(auth, process.env.APP_SECRET);
  
      if (typeof resultPayload !== "object") {
        throw new Error("Token invalid");
      }
  
      req.user = {
        id: resultPayload.id,
        email: resultPayload.email,
      };
  
      next();
    } catch (error) {
      next(error);
    }
  };

  const login: RequestHandler = async (req, res, next) => {

    try {
      const { email, password } = req.body;
      console.log("Login attempt:", { email, password });
      const user = await userRepository.readByEmailWithPassword(email);
  
      if (!user) {
        res.status(422).json({ message: "Email incorrect" });
        return
      }
  
      if (user.password !== password) { 
        res.status(422).json({ message: "Mot de passe incorrect" });
        return;
      }
  
      const payload = { id: user.id, email: user.email, username: user.username };
      if (!process.env.APP_SECRET) {
        throw new Error("APP_SECRET non configuré dans le .env");
      }
  
      const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "1y" });
      res.cookie("auth", token, { httpOnly: true, secure: false })
        .json({ message: "Connexion réussie", user_id: payload.id, username: payload.username });
    } catch (error) {
      next(error);
    }
  };

  const logout: RequestHandler = async (req, res, next) => {
    res.clearCookie("auth").sendStatus(204);
  };

  const checkAuth: RequestHandler = async (req, res, next) => {
    if (!process.env.APP_SECRET) {
      throw new Error("APP_SECRET non configuré dans le .env");
    }
  
    try {
      const { auth } = req.cookies;
  
      if (!auth) {
        res.status(401).json({ message: "Non authentifié" });
        return;
      }
  
      const payload = jwt.verify(auth, process.env.APP_SECRET);
      if (typeof payload !== "object") {
        throw new Error("Token invalide");
      }
  
      res.json({ user_id: payload.id, username: payload.username });
    } catch (error) {
      next(error);
    }
  };

  export default { login, verify, logout, checkAuth};