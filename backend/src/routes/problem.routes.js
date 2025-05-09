import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
const problemRoutes = express.Router();
// problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createproblem)
export default problemRoutes