import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

import userRoutes from "./routes/userRoutes.js"; // rutas de usuarios

dotenv.config();

const app = express();

app.use("/api", chatRoutes);

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err);
    process.exit(1); // detiene el servidor si no se conecta
  });

// Rutas
app.use("/api/users", userRoutes);

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

export default app;