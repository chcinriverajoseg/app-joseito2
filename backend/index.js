/*import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Message from "./models/Message.js";

dotenv.config();

// 🧠 APP
const app = express();
const server = http.createServer(app);

// 🔌 SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://frontend-app-joseito.vercel.app",
    ],
    credentials: true,
  },
});

// 👥 usuarios online
let onlineUsers = [];

// ⚡ SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("🟢 Usuario conectado:", socket.id);

  // usuario online
  socket.on("userOnline", (userId) => {
    socket.userId = userId;

    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }

    io.emit("onlineUsers", onlineUsers);
  });

  // entrar a sala
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log("📥 Sala:", roomId);
  });

  // enviar mensaje
  socket.on("sendMessage", async ({ roomId, sender, receiver, text }) => {
    const message = await Message.create({
      roomId,
      sender,
      receiver,
      text,
    });

    io.to(roomId).emit("receiveMessage", message);
  });

  // desconectar
  socket.on("disconnect", () => {
    if (socket.userId) {
      onlineUsers = onlineUsers.filter((id) => id !== socket.userId);
      io.emit("onlineUsers", onlineUsers);
    }

    console.log("🔴 Usuario desconectado:", socket.id);
  });
});

// 🧩 MIDDLEWARES
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-app-joseito.vercel.app",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// 🗄️ MONGO
mongoose
  .connect(process.env.MONGO_URI, { dbName: "app-joseito" })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Mongo error:", err);
    process.exit(1);
  });

// 🚏 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "🚀 API + Socket OK" });
});

// 🚀 START
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🔥 Backend + Socket en http://localhost:${PORT}`);
});*/

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

/* ================= SOCKET.IO ================= */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Usuario conectado:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", async ({ roomId, sender, text }) => {
    const message = await Message.create({
      roomId,
      sender,
      text,
    });

    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado:", socket.id);
  });
});

/* ================= MIDDLEWARES ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

/* ================= MONGODB ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Mongo error:", err);
    process.exit(1);
  });

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "🚀 API + Socket funcionando" });
});

/* ================= START ================= */
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🔥 Backend + Socket en http://localhost:${PORT}`);
});

