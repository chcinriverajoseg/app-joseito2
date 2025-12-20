import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getChatMessages,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

// 📥 Obtener historial del chat
router.get("/:userId", protect, getChatMessages);

// 📤 Enviar mensaje
router.post("/:userId", protect, sendMessage);

export default router;
