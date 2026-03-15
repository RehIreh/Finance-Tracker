import express from "express"
import { profile } from "../controllers/userController.js";
import { checkToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/profile", checkToken, profile);



export default router