
/*import User from "../models/User.js";

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

// 👤 PERFIL
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Error perfil" });
  }
};

// ✏️ ACTUALIZAR PERFIL
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error update" });
  }
};

// 🔍 EXPLORAR USUARIOS
export const getExploreUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      likes: { $ne: req.user._id },
    }).select("name email");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error explore" });
  }
};

// ❤️ LIKE + MATCH
export const sendLike = async (req, res) => {
  try {
    const targetId = req.params.id;

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.likes.includes(targetId)) {
      currentUser.likes.push(targetId);
      await currentUser.save();
    }

    // 💘 MATCH
    if (targetUser.likes.includes(currentUser._id)) {
      if (!currentUser.matches.includes(targetId)) {
        currentUser.matches.push(targetId);
      }
      if (!targetUser.matches.includes(currentUser._id)) {
        targetUser.matches.push(currentUser._id);
      }

      await currentUser.save();
      await targetUser.save();

      return res.json({ match: true, message: "Match generado 💘" });
    }

    res.json({ match: false, message: "Like enviado" });
  } catch (err) {
    res.status(500).json({ message: "Error like" });
  }
};

// 🤝 MATCHES
export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("matches", "name email");

    res.json(user.matches);
  } catch (err) {
    res.status(500).json({ message: "Error matches" });
  }
};
