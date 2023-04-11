import express from "express";
import {
    createWorkspace,
    editWorkspace,
    findWorkspace,
    inviteToWorkspace,
    listWorkspace,
} from "../controllers/workspace.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/", checkAuth, createWorkspace);
router.post("/invite", checkAuth, inviteToWorkspace);
router.patch("/:uuid", editWorkspace);
router.get("/:id", checkAuth, listWorkspace);
router.get("/:uuid", findWorkspace);

export default router;
