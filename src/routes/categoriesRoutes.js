import express from 'express'
import { checkToken } from '../middleware/authMiddleware.js'
import { getCategories } from '../controllers/categoriesController.js';





const router = express.Router();


router.get("/", checkToken, getCategories);


export default router; 