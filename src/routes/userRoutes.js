import express from "express"
import { profile, updateProfile } from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/profile", checkToken, profile);
router.patch("/profile/:id", checkToken, updateProfile);



export default router