import express from "express";
import { UserUpdate } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/update", protect, UserUpdate);

export default router;
