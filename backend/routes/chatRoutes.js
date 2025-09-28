// backend/routes/chatRoutes.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  listChats,
  createOrGetChatWith,
  getChat,
  listMessages,
  sendMessage,
} from "../controllers/chatController.js";

const router = Router();

router.use(auth);

router.get("/chats", listChats);
router.post("/chats/with/:userId", createOrGetChatWith);
router.get("/chats/:chatId", getChat);
router.get("/chats/:chatId/messages", listMessages);
router.post("/chats/:chatId/messages", sendMessage);

export default router;
