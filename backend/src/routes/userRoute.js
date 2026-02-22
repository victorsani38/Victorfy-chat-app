import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {  acceptRequest, getFriendRequests, getMyFriends, outGoingRequest, recommendedUsers, sendFriendRequest } from "../controllers/user.js";

const router = express.Router();
router.use(protect)
router.get("/", recommendedUsers)
router.get("/friends", getMyFriends)
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-request", outGoingRequest);


export default router
