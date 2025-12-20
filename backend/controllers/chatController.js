import Message from "../models/Message.js";

// 📥 Obtener historial del chat
export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("❌ Error getChatMessages:", error.message);
    res.status(500).json({ message: "Error al cargar mensajes" });
  }
};

// 📤 Enviar mensaje
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { text } = req.body;

    const message = await Message.create({
      sender: req.user._id,
      receiver: userId,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("❌ Error sendMessage:", error.message);
    res.status(500).json({ message: "Error al enviar mensaje" });
  }
};
