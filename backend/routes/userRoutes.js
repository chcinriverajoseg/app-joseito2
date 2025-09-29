/*import express from "express";
import { registerUser, loginUser, getMatches } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/matches/:id", getMatches);

export default router;*/
// backend/routes/usersRoutes.js
// backend/routes/usersRoutes.js

// backend/routes/usersRoutes.js
/*import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  exploreUsers,
  likeUser,
  skipUser,
  getMyMatches,
} from "../controllers/userDiscoveryController.js";

const router = Router();

router.use(auth);

router.get("/users/explore", exploreUsers);
router.post("/users/:userId/like", likeUser);
router.post("/users/:userId/skip", skipUser);
router.get("/users/matches", getMyMatches);

export default router;*/
// backend/routes/userRoutes.js
import { Router } from "express";
import { getUserProfile, updateUser } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = Router();

// ✅ Obtener perfil autenticado
router.get("/users/me", auth, getUserProfile);

// ✅ Actualizar perfil
router.put("/users/:id", auth, updateUser);

export default router;

