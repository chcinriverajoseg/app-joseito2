// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const sign = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email y password son requeridos" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email ya registrado" });

    const user = await User.create({ name, email, password });
    const token = sign(user._id);

    res.status(201).json({ token, user: user.toJSONSafe() });
  } catch (e) {
    console.error("[register]", e);
    res.status(500).json({ message: "Error al registrar" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email y password son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = sign(user._id);
    res.json({ token, user: user.toJSONSafe() });
  } catch (e) {
    console.error("[login]", e);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user._id).select("_id name email avatar interests");
    res.json(user);
  } catch (e) {
    console.error("[me]", e);
    res.status(500).json({ message: "Error" });
  }
}
