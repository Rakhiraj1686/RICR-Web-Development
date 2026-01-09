import express from 'express'
import { UserRegister,UserLogin,userLogout } from "../controllers/myController.js";

const router = express.Router();

router.post("/register",UserRegister);
router.post("/login",UserLogin);
router.get("/logout",userLogout);

export default router;