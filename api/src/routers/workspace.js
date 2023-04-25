import express from "express";
import { checkAuth } from "../middleware/authUser.js";
import {
    createWorkspace,
    findTeam,
    findWorkspace,
    inviteToWorkspace,
    listWorkspace,
} from "../controllers/workspace.js";

const router = express.Router();

router.post("/", checkAuth, createWorkspace);
router.get("/members/:work_key", checkAuth, findWorkspace);
router.get("/team/:work_key", checkAuth, findTeam);
router.post("/invite-to-workspace", checkAuth, inviteToWorkspace);
router.get("/list-workspaces", checkAuth, listWorkspace);

export default router;
