// routes/matches.js
import express from 'express';
import { getUserMatches } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserMatches); // GET /api/matches/:id

export default router;
