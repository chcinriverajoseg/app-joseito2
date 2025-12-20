import express from "express";
import {
  getProfile,
  updateProfile,
  getExploreUsers,
  sendLike,
  getMatches,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);
router.get("/explore", protect, getExploreUsers);
router.put("/like/:id", protect, sendLike);
router.get("/matches", protect, getMatches);

export default router;
