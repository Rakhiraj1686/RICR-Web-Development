import express from "express";
import {
  NewContact,
  GetAllRestaurants,
  GetAllRestaurantMenuData,
} from "../controllers/PublicController.js";

const router = express.Router();

router.post("/new-contact", NewContact);
router.get("/allRestaurants", GetAllRestaurants);
router.get("/restaurant/menu/:id", GetAllRestaurantMenuData);

export default router;
