/*// backend/controllers/userDiscoveryController.js
import mongoose from "mongoose";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

const toId = (id) => new mongoose.Types.ObjectId(id);

// GET /api/users/explore?limit=20
export async function exploreUsers(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);

    // Trae mis listas para excluir
    const me = await User.findById(req.user._id).select("_id likes skips matches").lean();
    if (!me) return res.status(401).json({ message: "Unauthorized" });

    const excludeIds = [
      me._id,
      ...(me.likes || []),
      ...(me.skips || []),
      ...(me.matches || []),
    ].map(String);

    // Sencillo feed: usuarios que no estén excluidos
    const candidates = await User.find({
      _id: { $nin: excludeIds },
    })
      .select("_id name email avatar interests")
      .limit(limit)
      .lean();

    res.json(candidates);
  } catch (e) {
    console.error("[exploreUsers]", e);
    res.status(500).json({ message: "Error en explorar usuarios" });
  }
}

// POST /api/users/:userId/skip
export async function skipUser(req, res) {
  try {
    const meId = req.user._id;
    const otherId = toId(req.params.userId);

    if (meId.equals(otherId)) return res.status(400).json({ message: "No puedes omitir tu propio perfil" });

    await User.updateOne(
      { _id: meId },
      { $addToSet: { skips: otherId } }
    );

    res.json({ ok: true });
  } catch (e) {
    console.error("[skipUser]", e);
    res.status(500).json({ message: "Error al omitir usuario" });
  }
}

// POST /api/users/:userId/like
export async function likeUser(req, res) {
  try {
    const meId = req.user._id;
    const otherId = toId(req.params.userId);

    if (meId.equals(otherId)) return res.status(400).json({ message: "No puedes darte like a ti mismo" });

    // Agrego like mío
    await User.updateOne(
      { _id: meId },
      { $addToSet: { likes: otherId } }
    );

    // ¿El otro ya me había dado like?
    const other = await User.findById(otherId).select("_id likes matches").lean();
    const mutual = other?.likes?.map(String).includes(meId.toString());

    if (!mutual) {
      return res.json({ ok: true, match: false });
    }

    // Es match → agrega a ambas listas de matches
    await Promise.all([
      User.updateOne({ _id: meId },   { $addToSet: { matches: otherId } }),
      User.updateOne({ _id: otherId }, { $addToSet: { matches: meId } }),
    ]);

    // Crea/obtiene chat si no existe
    let chat = await Chat.findOne({
      members: { $all: [meId, otherId] },
      $expr: { $eq: [{ $size: "$members" }, 2] },
    });

    if (!chat) {
      chat = await Chat.create({ members: [meId, otherId] });

      // (Opcional) primer mensaje del sistema
      const welcome = await Message.create({
        chat: chat._id,
        author: meId, // o puedes usar null/system si tienes soporte
        text: "¡Es un match! 👋",
      });
      chat.lastMessage = welcome._id;
      await chat.save();
    }

    res.json({ ok: true, match: true, chatId: chat._id });
  } catch (e) {
    console.error("[likeUser]", e);
    res.status(500).json({ message: "Error al dar like" });
  }
}

// GET /api/users/matches
export async function getMyMatches(req, res) {
  try {
    const me = await User.findById(req.user._id).select("matches").lean();
    const peers = await User.find({ _id: { $in: me.matches || [] } })
      .select("_id name email avatar interests")
      .lean();

    res.json(peers);
  } catch (e) {
    console.error("[getMyMatches]", e);
    res.status(500).json({ message: "Error al listar matches" });
  }
}*/
// backend/controllers/userDiscoveryController.js
import mongoose from "mongoose";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

const toId = (id) => new mongoose.Types.ObjectId(id);

// GET /api/users/explore
export async function exploreUsers(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);

    const me = await User.findById(req.user._id)
      .select("_id likes skips matches")
      .lean();
    if (!me) return res.status(401).json({ message: "Unauthorized" });

    const excludeIds = [
      me._id,
      ...(me.likes || []),
      ...(me.skips || []),
      ...(me.matches || []),
    ].map(String);

    const candidates = await User.find({ _id: { $nin: excludeIds } })
      .select("_id name email avatar interests")
      .limit(limit)
      .lean();

    res.json(candidates);
  } catch (e) {
    console.error("[exploreUsers]", e);
    res.status(500).json({ message: "Error en explorar usuarios" });
  }
}

// POST /api/users/:userId/skip
export async function skipUser(req, res) {
  try {
    const meId = req.user._id;
    const otherId = toId(req.params.userId);

    if (meId.equals(otherId)) {
      return res.status(400).json({ message: "No puedes omitir tu propio perfil" });
    }

    await User.updateOne({ _id: meId }, { $addToSet: { skips: otherId } });

    res.json({ ok: true });
  } catch (e) {
    console.error("[skipUser]", e);
    res.status(500).json({ message: "Error al omitir usuario" });
  }
}

// POST /api/users/:userId/like
export async function likeUser(req, res) {
  try {
    const meId = req.user._id;
    const otherId = toId(req.params.userId);

    if (meId.equals(otherId)) {
      return res.status(400).json({ message: "No puedes darte like a ti mismo" });
    }

    await User.updateOne({ _id: meId }, { $addToSet: { likes: otherId } });

    const other = await User.findById(otherId).select("_id likes matches").lean();
    const mutual = other?.likes?.map(String).includes(meId.toString());

    if (!mutual) {
      return res.json({ ok: true, match: false });
    }

    // Es match
    await Promise.all([
      User.updateOne({ _id: meId }, { $addToSet: { matches: otherId } }),
      User.updateOne({ _id: otherId }, { $addToSet: { matches: meId } }),
    ]);

    // Crear chat si no existe
    let chat = await Chat.findOne({
      members: { $all: [meId, otherId] },
      $expr: { $eq: [{ $size: "$members" }, 2] },
    });

    if (!chat) {
      chat = await Chat.create({ members: [meId, otherId] });

      // Mensaje inicial opcional
      const welcome = await Message.create({
        chat: chat._id,
        author: meId,
        text: "¡Es un match! 🎉",
      });
      chat.lastMessage = welcome._id;
      await chat.save();
    }

    res.json({ ok: true, match: true, chatId: chat._id });
  } catch (e) {
    console.error("[likeUser]", e);
    res.status(500).json({ message: "Error al dar like" });
  }
}

// GET /api/users/matches
export async function getMyMatches(req, res) {
  try {
    const me = await User.findById(req.user._id).select("matches").lean();
    const peers = await User.find({ _id: { $in: me.matches || [] } })
      .select("_id name email avatar interests")
      .lean();

    res.json(peers);
  } catch (e) {
    console.error("[getMyMatches]", e);
    res.status(500).json({ message: "Error al listar matches" });
  }
}
