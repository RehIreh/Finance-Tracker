import "dotenv/config";
import express from "express";
import {pool, connectDB} from "./config/db.js";

import authRoutes from "./routes/authRoutes.js"
import errorHandler from "./middleware/errorHandler.js";



connectDB();

const app = express();

// Req Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//API
app.use("/auth", authRoutes);


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});



// Error handler
app.use(errorHandler);