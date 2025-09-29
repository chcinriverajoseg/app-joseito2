/*import http from "http";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});*/


import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api", authRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Error MongoDB:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));
