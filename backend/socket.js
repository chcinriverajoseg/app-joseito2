// backend/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "./models/Chat.js";

/**
 * Inicializa Socket.IO con auth por JWT.
 * - El frontend debe conectar con: io(SERVER_URL, { auth: { token } })
 * - Para recibir mensajes en tiempo real, el cliente debe hacer: socket.emit('chat:join', chatId)
 */
export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",           // ⚠️ En producción, limita a tu dominio del frontend
      methods: ["GET", "POST"]
    }
  });

  // Middleware de autenticación en el handshake
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token;

      if (!token) return next(new Error("No token"));
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      return next();
    } catch (err) {
      return next(err);
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.userId;
    if (!userId) return socket.disconnect(true);

    // (Opcional) auto-suscribir al usuario a todos sus chats actuales:
    try {
      const chats = await Chat.find({ members: userId }).select("_id").lean();
      chats.forEach((c) => socket.join(c._id.toString()));
    } catch (e) {
      // no romper conexión si falla
      console.error("[socket] auto-join error:", e?.message);
    }

    // Suscripción manual desde el cliente a un chat específico
    socket.on("chat:join", async (chatId) => {
      try {
        const chat = await Chat.findById(chatId).select("members").lean();
        if (!chat) return;
        const isMember = chat.members.map(String).includes(String(userId));
        if (!isMember) return;
        socket.join(chatId.toString());
      } catch (e) {
        console.error("[socket] chat:join error:", e?.message);
      }
    });

    socket.on("chat:leave", (chatId) => {
      socket.leave(chatId?.toString());
    });

    // (Opcional) indicador de tecleo
    socket.on("typing", (chatId) => {
      socket.to(chatId?.toString()).emit("typing", { chatId, userId });
    });

    socket.on("stop_typing", (chatId) => {
      socket.to(chatId?.toString()).emit("stop_typing", { chatId, userId });
    });

    socket.on("disconnect", () => {
      // noop
    });
  });

  return io;
}
// backend/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "./models/Chat.js";

export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",           // ⚠️ limita a tu dominio en producción
      methods: ["GET", "POST"],
    },
  });

  // Auth por JWT en el handshake
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) return next(new Error("No token"));
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      next(err);
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.userId;
    if (!userId) return socket.disconnect(true);

    // Auto-join a todos los chats del usuario
    try {
      const chats = await Chat.find({ members: userId }).select("_id").lean();
      chats.forEach((c) => socket.join(c._id.toString()));
    } catch (e) {
      console.error("[socket] auto-join error:", e?.message);
    }

    socket.on("chat:join", async (chatId) => {
      try {
        const chat = await Chat.findById(chatId).select("members").lean();
        if (!chat) return;
        const isMember = chat.members.map(String).includes(String(userId));
        if (!isMember) return;
        socket.join(chatId.toString());
      } catch (e) {
        console.error("[socket] chat:join error:", e?.message);
      }
    });

    socket.on("chat:leave", (chatId) => {
      socket.leave(chatId?.toString());
    });

    socket.on("typing", (chatId) => {
      socket.to(chatId?.toString()).emit("typing", { chatId, userId });
    });

    socket.on("stop_typing", (chatId) => {
      socket.to(chatId?.toString()).emit("stop_typing", { chatId, userId });
    });
  });

  return io;
}
