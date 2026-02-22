import express from "express";
import { getStreamToken } from "../controllers/chat.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/token", protect, getStreamToken)

export default router