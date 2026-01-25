import express from "express";
import { UserUpdate,UserChangePhoto } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer"

const router = express.Router();
const Uploads = multer();



router.put("/update", protect, UserUpdate);
router.patch("/changePhoto",protect, Uploads.single("image"), UserChangePhoto)

export default router;
