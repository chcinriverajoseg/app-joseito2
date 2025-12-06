import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.io correctamente
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// ==============================
// 📌 SOCKET.IO EVENTOS
// ==============================
io.on("connection", (socket) => {
  console.log("🟢 Usuario conectado:", socket.id);

  // Entrar en sala
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`🔵 Usuario ${socket.id} entró a sala: ${roomId}`);
  });

  // Mensajes
  socket.on("send_message", (data) => {
    console.log("📩 Mensaje recibido:", data);

    io.to(data.room).emit("receive_message", {
      text: data.text,
      author: data.author,
      room: data.room,
      createdAt: new Date()
    });
  });

  // Typing indicator
  socket.on("typing", ({ room }) => {
    socket.to(room).emit("user_typing");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado", socket.id);
  });
});

// ==============================
// 📌 CONEXIÓN A MONGO
// ==============================
mongoose
  .connect(process.env.MONGO_URI, { dbName: "app-joseito" })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error MongoDB:", err);
    process.exit(1);
  });

  

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("join", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("new_message", (msg) => {
    io.to(msg.roomId).emit("new_message", msg);
  });

  socket.on("mark_read", ({ roomId }) => {
    io.to(roomId).emit("read_update");
  });

  socket.on("online", (userId) => {
    io.emit("user_online", userId);
  });

  socket.on("disconnect", () => {
    io.emit("user_offline");
  });
});


// ==============================
// 📌 RUTAS API
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ==============================
// 📌 INICIAR SERVIDOR
// ==============================
const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`🚀 Servidor + Socket.io corriendo en http://localhost:${PORT}`)
);
