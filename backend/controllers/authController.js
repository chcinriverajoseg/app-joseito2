// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Generar token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Registro
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario existe
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("❌ Error en registro:", err);
    res.status(500).json({ message: "Error en el registro" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Comparar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    res.json({
      user: { _id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ message: "Error en el login" });
  }
};
