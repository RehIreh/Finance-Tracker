import express from "express"
import { deleteProfile, profile, updateProfile } from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/profile", checkToken, profile);
router.patch("/profile/:id", checkToken, updateProfile);
router.delete("/profile/:id", checkToken, deleteProfile);



export default router