import express from "express";
import multer from "multer";
import { PartnerProtect, Protect } from "../middlewares/authMiddleware.js";
import {
  RiderGetAvailableOrder,
  RiderGetCompletedOrder,
  RiderGetOngoingOrder,
  RiderAcceptOrder,
  RiderUpdateOrderStatus,
  RiderUpdate,
  RiderChangePhoto,
  RiderResetPassword,
  RiderToggleAvailability,
} from "../controllers/riderController.js";
const router = express.Router();
const upload = multer();

router.post("/availableOrder", Protect, PartnerProtect, RiderGetAvailableOrder);
router.get("/ongoingOrder", Protect, PartnerProtect, RiderGetOngoingOrder);
router.get("/completedOrder", Protect, PartnerProtect, RiderGetCompletedOrder);

router.patch("/orders/:id/accept", Protect, PartnerProtect, RiderAcceptOrder);
router.patch("/orders/:id/status", Protect, PartnerProtect, RiderUpdateOrderStatus);

router.put("/update", Protect, PartnerProtect, RiderUpdate);
router.patch(
  "/changePhoto",
  Protect,
  PartnerProtect,
  upload.single("image"),
  RiderChangePhoto,
);
router.patch("/resetPassword", Protect, PartnerProtect, RiderResetPassword);
router.patch("/toggleAvailability", Protect, PartnerProtect, RiderToggleAvailability);

export default router;
