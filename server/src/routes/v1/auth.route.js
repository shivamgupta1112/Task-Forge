import express from "express";
import { createUser, loginUser } from "../../controllers/v1/auth.controller.js";
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);

export default router;