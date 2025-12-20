/*import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Chat from "./models/Chat.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://frontend-app-joseito.vercel.app",
      ],
      credentials: true,
    },
  });

io.on("connection", (socket) => {
  console.log("🟢 Conectado:", socket.userId);

  socket.broadcast.emit("user:online", socket.userId);

  socket.on("chat:join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("typing", socket.userId);
  });

  socket.on("stopTyping", (roomId) => {
    socket.to(roomId).emit("stopTyping");
  });

  socket.on("sendMessage", (message) => {
    io.to(message.receiver).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user:offline", socket.userId);
  });
});



  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket conectado:", socket.userId);

    socket.on("chat:join", (roomId) => {
      socket.join(roomId);
    });

    socket.on("chat:leave", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("sendMessage", (message) => {
      io.to(message.receiver).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket desconectado:", socket.userId);
    });
  });
}
*/
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let onlineUsers = new Map();

export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://frontend-app-joseito.vercel.app",
      ],
      credentials: true,
    },
  });

  // 🔐 AUTH SOCKET (SIEMPRE ARRIBA)
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("No token"));

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log("🟢 Socket conectado:", userId);

    // 🟢 ONLINE
    onlineUsers.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    // 💬 JOIN CHAT
    socket.on("chat:join", (roomId) => {
      socket.join(roomId);
    });

    socket.on("chat:leave", (roomId) => {
      socket.leave(roomId);
    });

    // ✍️ TYPING
    socket.on("typing", (roomId) => {
      socket.to(roomId).emit("typing", userId);
    });

    socket.on("stopTyping", (roomId) => {
      socket.to(roomId).emit("stopTyping", userId);
    });

    // 📩 MENSAJE
    socket.on("sendMessage", (message) => {
      io.to(message.receiver).emit("newMessage", message);
    });

    // 🔴 OFFLINE
    socket.on("disconnect", () => {
      console.log("🔴 Socket desconectado:", userId);
      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
  });
}
