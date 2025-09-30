// backend/routes/userRoutes.js
import { Router } from "express";
import { getUserProfile, updateUser, likeUser, getMatches, getAllUsers } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = Router();

// Listar usuarios
router.get("/users", auth, getAllUsers);

// Perfil autenticado
router.get("/users/me", auth, getUserProfile);

// Actualizar perfil
router.put("/users/:id", auth, updateUser);

// Dar like
router.post("/users/:id/like", auth, likeUser);

// Ver matches
router.get("/users/matches", auth, getMatches);

export default router;
