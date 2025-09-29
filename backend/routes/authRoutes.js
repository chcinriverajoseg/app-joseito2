import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

// Registro y login
router.post("/users/register", register);
router.post("/users/login", login);

export default router;
