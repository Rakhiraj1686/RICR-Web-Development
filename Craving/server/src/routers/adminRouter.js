import express from "express";
import { Protect, AdminProtect } from "../middlewares/authMiddleware.js";
import {
  AdminGetStats,
  AdminGetUsersByRole,
  AdminGetAllOrders,
  AdminSetUserStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", Protect, AdminProtect, AdminGetStats);
router.get("/users/:role", Protect, AdminProtect, AdminGetUsersByRole);
router.get("/orders", Protect, AdminProtect, AdminGetAllOrders);
router.patch("/users/:id/status", Protect, AdminProtect, AdminSetUserStatus);

export default router;
