import express from "express"
import { checkToken } from "../middleware/authMiddleware.js";
import { getTransaction, addTransaction, deleteTransaction } from "../controllers/transactionController.js";


const router = express.Router();

router.get("/", checkToken, getTransaction);
router.post("/add", checkToken, addTransaction);
router.delete("/:id", checkToken, deleteTransaction);


export default router