import express from "express";
import {
  getProfile,
  updateProfile,
  getExploreUsers,
  sendLike,
  getMatches
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/me
router.get("/me", authMiddleware, getProfile);

// PUT /api/users/update
router.put("/update", authMiddleware, updateProfile);

// GET /api/users/explore
router.get("/explore", authMiddleware, getExploreUsers);

// PUT /api/users/like/:id
router.put("/like/:id", authMiddleware, sendLike);

// GET /api/users/matches
router.get("/matches", authMiddleware, getMatches);

export default router;

