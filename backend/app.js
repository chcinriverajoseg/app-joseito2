
/*// backend/app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/appjoseito";

try {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB conectado:", MONGO_URI);
} catch (err) {
  console.error("❌ Error conectando a MongoDB:", err.message);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", chatRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

export default app;
*/

// backend/app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/appjoseito";
await mongoose.connect(MONGO_URI);
console.log("✅ MongoDB conectado:", MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// Monta rutas
app.use("/api", authRoutes);
app.use("/api", usersRoutes);  // 👈 aquí
app.use("/api", chatRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

export default app;
