import express from "express";
import { askQuestion } from "../controllers/askController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/ask", authMiddleware, limiter, askQuestion);

export default router;