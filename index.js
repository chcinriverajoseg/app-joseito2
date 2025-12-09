import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Importar rutas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// 🔥 CORS va AQUÍ, justo después de const app = express()
app.use(
  cors({
    origin: [
      "http://localhost:5173",                                   // Localhost
      "https://frontend-app-joseito.vercel.app",                 // Frontend producción
      "https://frontend-app-joseito-git-main-jose-gregorios-projects.vercel.app" // Preview Vercel
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

// Conexión Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "app-joseito",
  })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error MongoDB:", err);
    process.exit(1);
  });

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Ruta test
app.get("/", (req, res) => {
  res.json({ message: "🚀 API app-joseito funcionando" });
});

// Error global
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: err.message,
  });
});

// Arranque servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 API corriendo en http://localhost:${PORT}`)
);
