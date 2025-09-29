/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Obtener usuario actual
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, interests } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      interests,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📥 Intento de login:', { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(`✅ Login exitoso para ${user.email}`);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Dar like a otro usuario
export const likeUser = async (req, res) => {
  // tu lógica
};

// Obtener matches
export const getMatches = async (req, res) => {
  // tu lógica
};
// backend/controllers/userController.js
/*import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
// backend/controllers/userController.js
/export const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Aquí iría la lógica real de autenticación
  if (email === "test@example.com" && password === "123456") {
    return res.json({
      token: "fake-jwt-token",
      user: { id: 1, email }
    });
  }

  res.status(401).json({ message: "Credenciales incorrectas" });
};

export const registerUser = (req, res) => {
  const { email, password } = req.body;
  // Aquí iría la lógica real de registro
  res.json({ message: "Usuario registrado", email });
};*/
import User from "../models/User.js";

// Obtener perfil
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error perfil:", err);
    res.status(500).json({ message: "Error obteniendo perfil" });
  }
};

// Actualizar perfil
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) return res.status(403).json({ message: "No autorizado" });

    const updates = {
      name: req.body.name,
      age: req.body.age,
      bio: req.body.bio,
      profileImage: req.body.profileImage,
    };

    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    console.error("❌ Error update:", err);
    res.status(500).json({ message: "Error actualizando perfil" });
  }
};
