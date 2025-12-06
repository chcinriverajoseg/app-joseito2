import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// Crear chat entre usuarios (si no existe)
export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "userId necesario" });

    // Buscar chat previo
    let chat = await Chat.findOne({
      users: { $all: [req.user._id, userId] },
    });

    // Si no existe se crea
    if (!chat) {
      chat = await Chat.create({ users: [req.user._id, userId] });
    }

    res.json(chat);
  } catch (err) {
    console.error("Error crear chat", err);
    res.status(500).json({ message: "Error crear chat" });
  }
};

// Obtener chats del usuario
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user._id }).populate(
      "users",
      "name email"
    );

    res.json(chats);
  } catch (err) {
    console.error("Error obtener chats", err);
    res.status(500).json({ message: "Error obtener chats" });
  }
};

// Enviar mensaje a un chat
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Texto requerido" });

    const message = await Message.create({
      chat: chatId,
      author: req.user._id,
      text,
    });

    res.json(message);
  } catch (err) {
    console.error("Error enviar mensaje", err);
    res.status(500).json({ message: "Error enviar mensaje" });
  }
};

// Obtener mensajes
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate(
      "author",
      "name email"
    );

    res.json(messages);
  } catch (err) {
    console.error("Error obtener mensajes", err);
    res.status(500).json({ message: "Error obtener mensajes" });
  }
};


