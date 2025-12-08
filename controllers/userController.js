/*
import User from "../models/User.js";

// Obtener perfil propio
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Error perfil" });
  }
};

// Editar perfil
export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error update" });
  }
};

// Listar usuarios para explorar
export const getExploreUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      likesReceived: { $ne: req.user._id },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error explore" });
  }
};

// Dar like
export const sendLike = async (req, res) => {
  try {
    const targetId = req.params.id;

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: "Usuario no encontrado" });

    // Guardar like
    target.likesReceived.push(req.user._id);
    await target.save();

    // Check match
    const sender = await User.findById(req.user._id);

    if (sender.likesReceived.includes(targetId)) {
      sender.matches.push(targetId);
      target.matches.push(req.user._id);

      await sender.save();
      await target.save();

      return res.json({ message: "Match 💘 generado", match: true });
    }

    res.json({ message: "Like enviado", match: false });
  } catch (err) {
    res.status(500).json({ message: "Error like" });
  }
};

// Obtener matches mutuos
export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("matches", "name email interests");

    res.json(user.matches);
  } catch (err) {
    res.status(500).json({ message: "Error matches" });
  }
};
*/

import User from "../models/User.js";

// Perfil propio
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Error perfil" });
  }
};

// Editar perfil
export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error update" });
  }
};

// Explorar usuarios (mostrar todos menos yo y los que ya di like)
export const getExploreUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      likes: { $ne: req.user._id },
    }).select("name email");

    res.json(users);
  } catch {
    res.status(500).json({ message: "Error explore" });
  }
};

// Dar like y verificar si es match
export const sendLike = async (req, res) => {
  try {
    const targetId = req.params.id;

    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: "Usuario no existe" });

    const sender = await User.findById(req.user._id);

    // Guardar like
    if (!sender.likes.includes(targetId)) {
      sender.likes.push(targetId);
      await sender.save();
    }

    // Si target también me dio like → match
    if (target.likes.includes(sender._id)) {
      if (!sender.matches.includes(targetId)) sender.matches.push(targetId);
      if (!target.matches.includes(sender._id)) target.matches.push(sender._id);

      await sender.save();
      await target.save();

      return res.json({ message: "Match 💘 generado", match: true });
    }

    res.json({ message: "Like enviado", match: false });
  } catch {
    res.status(500).json({ message: "Error like" });
  }
};

// Obtener matches
export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("matches", "name email");
    res.json(user.matches);
  } catch {
    res.status(500).json({ message: "Error matches" });
  }
};

