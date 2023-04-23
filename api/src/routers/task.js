import express from "express";
import { createTask, listTask } from "../controllers/task.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/", checkAuth, createTask);
router.get("/", checkAuth, listTask);
export default router;
