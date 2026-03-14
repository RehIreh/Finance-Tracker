import express from "express"
import { register, login, logout, me } from "../controllers/authController.js";
import { checkToken } from "../middleware/authMiddleware.js";



const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", checkToken, me);

// router.get("/logout", logout);

export default router; 