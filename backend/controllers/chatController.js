import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

// GET /api/chats
export async function listChats(req, res) {
  try {
    // Trae chats donde está el user, con último mensaje y info del peer
    const chats = await Chat.find({ members: req.user._id })
      .populate({ path: "lastMessage", select: "text createdAt author" })
      .sort({ updatedAt: -1 })
      .lean();

    // Adjunta "peer" (el otro miembro) y una forma amigable para el frontend
    const memberIds = chats.flatMap(c => c.members).filter(id => id.toString() !== req.user._id.toString());
    const peers = await User.find({ _id: { $in: memberIds } })
      .select("_id name avatar email")
      .lean();

    const peerMap = new Map(peers.map(p => [p._id.toString(), p]));

    const shaped = chats.map(c => {
      const otherId = c.members.find(m => m.toString() !== req.user._id.toString());
      return {
        _id: c._id,
        peer: peerMap.get(otherId?.toString()) || null,
        lastMessage: c.lastMessage
          ? {
              _id: c.lastMessage._id,
              text: c.lastMessage.text,
              createdAt: c.lastMessage.createdAt,
            }
          : null,
        updatedAt: c.updatedAt,
        createdAt: c.createdAt,
      };
    });

    res.json(shaped);
  } catch (e) {
    console.error("[listChats]", e);
    res.status(500).json({ message: "Error listing chats" });
  }
}

// POST /api/chats/with/:userId
export async function createOrGetChatWith(req, res) {
  try {
    const me = req.user._id;
    const other = toObjectId(req.params.userId);
    if (me.equals(other)) return res.status(400).json({ message: "No puedes chatear contigo mismo" });

    // busca chat existente con ambos miembros
    let chat = await Chat.findOne({ members: { $all: [me, other] }, $expr: { $eq: [{ $size: "$members" }, 2] } });
    if (!chat) {
      chat = await Chat.create({ members: [me, other] });
    }

    // devuelve la cabecera con peer
    const peer = await User.findById(other).select("_id name avatar email").lean();
    const lastMessage = chat.lastMessage
      ? await Message.findById(chat.lastMessage).select("text createdAt").lean()
      : null;

    res.json({
      _id: chat._id,
      peer,
      lastMessage,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    });
  } catch (e) {
    console.error("[createOrGetChatWith]", e);
    res.status(500).json({ message: "Error creating/getting chat" });
  }
}

// GET /api/chats/:chatId
export async function getChat(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).lean();
    if (!chat) return res.status(404).json({ message: "Chat no encontrado" });
    if (!chat.members.map(String).includes(req.user._id.toString())) {
      return res.status(403).json({ message: "Sin acceso a este chat" });
    }
    const otherId = chat.members.find(m => m.toString() !== req.user._id.toString());
    const peer = await User.findById(otherId).select("_id name avatar email").lean();
    const lastMessage = chat.lastMessage
      ? await Message.findById(chat.lastMessage).select("text createdAt").lean()
      : null;

    res.json({ _id: chat._id, peer, lastMessage, createdAt: chat.createdAt, updatedAt: chat.updatedAt });
  } catch (e) {
    console.error("[getChat]", e);
    res.status(500).json({ message: "Error getting chat" });
  }
}

// GET /api/chats/:chatId/messages
export async function listMessages(req, res) {
  try {
    const { chatId } = req.params;
    const { limit = 50, before } = req.query; // paginación simple
    const chat = await Chat.findById(chatId).lean();
    if (!chat) return res.status(404).json({ message: "Chat no encontrado" });
    if (!chat.members.map(String).includes(req.user._id.toString())) {
      return res.status(403).json({ message: "Sin acceso a este chat" });
    }

    const filter = { chat: chat._id };
    if (before) filter.createdAt = { $lt: new Date(before) };

    const msgs = await Message.find(filter)
      .sort({ createdAt: 1 })
      .limit(Number(limit))
      .select("_id text author createdAt")
      .lean();

    res.json(msgs);
  } catch (e) {
    console.error("[listMessages]", e);
    res.status(500).json({ message: "Error listing messages" });
  }
}

// POST /api/chats/:chatId/messages
export async function sendMessage(req, res) {
  try {
    const { chatId } = req.params;
    const { text } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat no encontrado" });
    if (!chat.members.map(String).includes(req.user._id.toString())) {
      return res.status(403).json({ message: "Sin acceso a este chat" });
    }
    if (!text || !text.trim()) return res.status(400).json({ message: "Texto requerido" });

    const msg = await Message.create({
      chat: chat._id,
      author: req.user._id,
      text: text.trim(),
    });

    // actualiza el lastMessage del chat
    chat.lastMessage = msg._id;
    await chat.save();

    // emitir por socket.io (si está disponible en req.app.get('io'))
    const io = req.app.get("io");
    if (io) {
      io.to(chat._id.toString()).emit("message:new", {
        _id: msg._id,
        text: msg.text,
        author: { _id: req.user._id },
        createdAt: msg.createdAt,
      });
    }

    res.status(201).json({
      _id: msg._id,
      text: msg.text,
      author: { _id: req.user._id },
      createdAt: msg.createdAt,
    });
  } catch (e) {
    console.error("[sendMessage]", e);
    res.status(500).json({ message: "Error sending message" });
  }
}
