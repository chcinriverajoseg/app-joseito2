import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

/* ========= CLOUDINARY CONFIG ========= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ========= MULTER MEMORY (NO DISK) ========= */
const upload = multer({ storage: multer.memoryStorage() });

/* ========= ENVIAR MENSAJE ========= */
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { roomId, text, type, url } = req.body;

    const msg = await Message.create({
      roomId,
      author: req.user.id,
      text: type === "image" ? null : text,
      type: type || "text",
      url: type === "image" ? url : null,
      read: false,
      createdAt: new Date(),
    });

    res.json(msg);
  } catch (error) {
    console.error("Error enviando mensaje", error);
    res.status(500).json({ error: "Error enviando mensaje" });
  }
});

/* ========= SUBIR IMAGEN A CLOUDINARY ========= */
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });

    // convertir a base64
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const fileUri = `data:${req.file.mimetype};base64,${base64}`;

    // subir a cloudinary
    const uploadResp = await cloudinary.uploader.upload(fileUri, {
      folder: "joseito_chat",
    });

    res.json({ url: uploadResp.secure_url });

  } catch (error) {
    console.error("Error subida cloudinary:", error);
    res.status(500).json({ error: "Upload error" });
  }
});

/* ========= OBTENER MENSAJES ========= */
router.get("/:roomId", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error obteniendo chat", error);
    res.status(500).json({ error: "Error obteniendo chat" });
  }
});

/* ========= MARCAR ✓✓ ========= */
router.post("/mark-read", authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.body;

    await Message.updateMany(
      { roomId, author: { $ne: req.user.id }, read: false },
      { read: true }
    );

    res.json({ message: "Leído ✓✓" });
  } catch (error) {
    console.error("Error marcando leído", error);
    res.status(500).json({ error: "Error al marcar leído" });
  }
});

/* ========= ONLINE ========= */
router.post("/online", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { online: true });
    res.json({ message: "Online" });
  } catch (error) {
    console.error("Error online", error);
    res.status(500).json({ error: "Error online" });
  }
});

/* ========= OFFLINE ========= */
router.post("/offline", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { online: false });
    res.json({ message: "Offline" });
  } catch (error) {
    console.error("Error offline", error);
    res.status(500).json({ error: "Error offline" });
  }
});

export default router;
