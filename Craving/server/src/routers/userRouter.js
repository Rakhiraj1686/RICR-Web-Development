import express from "express";
import { UserUpdate } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.put("/update", protect, UserUpdate);

export default router;
