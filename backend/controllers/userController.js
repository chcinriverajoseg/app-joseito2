// backend/controllers/userController.js
import User from "../models/User.js";

// ✅ Obtener perfil autenticado
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error getUserProfile:", err);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

// ✅ Actualizar perfil
export const updateUser = async (req, res) => {
  try {
    const { name, bio, age, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, age, avatar },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error updateUser:", err);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

// ✅ Dar like a otro usuario
export const likeUser = async (req, res) => {
  try {
    const me = req.user._id;
    const { id } = req.params;

    if (me.toString() === id) {
      return res.status(400).json({ message: "No puedes darte like a ti mismo" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Evitar duplicados
    if (!user.likes) user.likes = [];
    if (!user.likes.includes(me)) {
      user.likes.push(me);
      await user.save();
    }

    // Revisar si hay match
    const meUser = await User.findById(me);
    if (meUser.likes && meUser.likes.includes(id)) {
      return res.json({ message: "¡Es un match!" });
    }

    res.json({ message: "Like registrado" });
  } catch (err) {
    console.error("❌ Error likeUser:", err);
    res.status(500).json({ message: "Error al dar like" });
  }
};

// ✅ Ver matches del usuario
export const getMatches = async (req, res) => {
  try {
    const me = req.user._id;
    const user = await User.findById(me).populate("likes", "_id name email avatar");

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Buscar usuarios que también dieron like a este user
    const matches = user.likes.filter((u) => u.likes?.includes(me));
    res.json(matches);
  } catch (err) {
    console.error("❌ Error getMatches:", err);
    res.status(500).json({ message: "Error al obtener matches" });
  }
};

// ✅ Listar todos los usuarios excepto el autenticado
export const getAllUsers = async (req, res) => {
  try {
    const me = req.user._id;
    const users = await User.find({ _id: { $ne: me } }).select("_id name email bio avatar");
    res.json(users);
  } catch (err) {
    console.error("❌ Error getAllUsers:", err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
