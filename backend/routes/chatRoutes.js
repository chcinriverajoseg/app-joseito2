import { Router } from "express";
import auth from "../middleware/auth.js";
import { createChat, getChats, sendMessage, getMessages } from "../controllers/chatController.js";

const router = Router();

router.post("/chats", auth, createChat);
router.get("/chats", auth, getChats);
router.post("/chats/:chatId/messages", auth, sendMessage);
router.get("/chats/:chatId/messages", auth, getMessages);

export default router;
