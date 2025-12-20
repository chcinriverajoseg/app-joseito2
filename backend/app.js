import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// rutas
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

export default app;
