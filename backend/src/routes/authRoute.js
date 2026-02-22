import express from "express";
import { login, logout, onboardUser, signUp } from "../controllers/auth.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.put('/onboard', protect,onboardUser);
router.get('/me', protect, (req, res)=> {
 return res.status(200).json({success:true, user:req.user});
});

export default router