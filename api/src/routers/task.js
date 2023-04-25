import express from "express";
import {
    commentTask,
    createTask,
    detailTask,
    listTask,
    taskAttachment,
} from "../controllers/task.js";
import { checkAuth } from "../middleware/authUser.js";

const router = express.Router();

router.post("/", checkAuth, createTask);
router.post("/comment/:task_key", checkAuth, commentTask);
router.post("/:task_key/attach", checkAuth, taskAttachment);
router.get("/", checkAuth, listTask);
router.get("/:task_key", checkAuth, detailTask);

export default router;
