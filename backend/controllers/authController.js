import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generar Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Usuario creado",
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("❌ Error registro:", err);
    res.status(500).json({ message: "Error en servidor" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Credenciales inválidas" });

    res.json({
      message: "Login exitoso",
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("❌ Error login:", err);
    res.status(500).json({ message: "Error servidor" });
  }
};
