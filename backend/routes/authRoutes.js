// backend/routes/authRoutes.js
import { Router } from "express";
import { login, register, me } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = Router();

// Rutas de compatibilidad con tu frontend:
router.post("/auth/login", login);     // primario
router.post("/users/login", login);    // fallback
router.post("/users/register", register);

// opcional: /auth/me para verificar sesión
router.get("/auth/me", auth, me);

export default router;
