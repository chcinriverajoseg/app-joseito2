import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

/**
 * Crear chat entre dos usuarios (solo si existe un match)
 */
export const createChat = async (req, res) => {
  try {
    const { userId } = req.body; // receptor
    const me = req.user._id;

    if (!userId) return res.status(400).json({ message: "Falta userId" });

    // Verificar si ya existe chat
    let chat = await Chat.findOne({
      users: { $all: [me, userId] },
    });

    if (!chat) {
      chat = await Chat.create({ users: [me, userId] });
    }

    res.status(201).json(chat); // mejor devolver 201 Created
  } catch (err) {
    console.error("❌ Error createChat:", err);
    res.status(500).json({ message: "Error al crear chat" });
  }
};

/**
 * Obtener chats del usuario autenticado
 */
export const getChats = async (req, res) => {
  try {
    const me = req.user._id;

    const chats = await Chat.find({ users: me })
      .populate("users", "_id name email avatar")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (err) {
    console.error("❌ Error getChats:", err);
    res.status(500).json({ message: "Error al obtener chats" });
  }
};

/**
 * Enviar mensaje en un chat
 */
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;
    const me = req.user._id;

    // ⚠️ Validar que el chat exista
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    const message = await Message.create({
      chat: chatId,
      author: me,
      text,
    });

    // Actualizar timestamp del chat
    chat.updatedAt = new Date();
    await chat.save();

    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Error sendMessage:", err);
    res.status(500).json({ message: "Error al enviar mensaje" });
  }
};

/**
 * Obtener mensajes de un chat
 */
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // ⚠️ Validar que el chat exista
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    const messages = await Message.find({ chat: chatId })
      .populate("author", "_id name email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error("❌ Error getMessages:", err);
    res.status(500).json({ message: "Error al obtener mensajes" });
  }
};
