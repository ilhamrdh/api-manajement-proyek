import express from "express";
import { checkAuth } from "../middleware/AuthUser.js";
import { createTask } from "../controllers/task.js";

const router = express.Router();

router.post("/", checkAuth, createTask);

export default router;
