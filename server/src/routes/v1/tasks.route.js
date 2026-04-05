import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../../controllers/v1/tasks.controller.js";
import { verifyToken } from "../../middleware/v1.auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getAllTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;