import express from "express";
import { checkAuth } from "../middleware/AuthUser.js";
import {
    createWorkspace,
    inviteToWorkspace,
} from "../controllers/workspace.js";

const router = express.Router();

router.post("/", checkAuth, createWorkspace);
router.post("/invite-to-workspace", checkAuth, inviteToWorkspace);

export default router;
