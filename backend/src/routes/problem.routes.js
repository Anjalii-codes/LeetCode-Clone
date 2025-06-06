import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { createproblem , getAllProblems, getProblemById, updateProblem, deleteProblem, getSolvedProblemsSolvedByUser } from "../controllers/problem.controllers.js";
const problemRoutes = express.Router();
problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createproblem)
problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems)
problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById)
problemRoutes.put("/update-problem/:id", authMiddleware, checkAdmin, updateProblem)
problemRoutes.delete("/delete-problem/:id", authMiddleware, checkAdmin, deleteProblem)
problemRoutes.get("/get-solved-problems", authMiddleware, getSolvedProblemsSolvedByUser)

export default problemRoutes