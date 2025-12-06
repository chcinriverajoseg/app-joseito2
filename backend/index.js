
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

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"], // <-- frontend permitido
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" })); // proteccion de payload grande

// Verificar conexión Mongo antes de levantar el server
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "app-joseito",  // puedes cambiarlo si quieres
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

// Ruta test para confirmar API funcionando
app.get("/", (req, res) => {
  res.json({ message: "🚀 API app-joseito funcionando" });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: err.message,
  });
});

// Arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API corriendo en http://localhost:${PORT}`));
