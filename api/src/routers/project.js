import express from "express";
import {
    createProject,
    findProject,
    inviteToProject,
} from "../controllers/project.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/", checkAuth, createProject);
router.post("/invite", checkAuth, inviteToProject);
router.get("/:id", checkAuth, findProject);

export default router;
