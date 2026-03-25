import express from 'express'
import { checkToken } from '../middleware/authMiddleware.js'
import { createCategories, deleteCategories, getCategories, updateCategories } from '../controllers/categoriesController.js';





const router = express.Router();


router.get("/", checkToken, getCategories);
router.post("/", checkToken, createCategories);
router.patch("/:id", checkToken, updateCategories);
router.delete("/:id", checkToken, deleteCategories);


export default router; 