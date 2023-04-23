import express from "express";
import {
    addMemberTeam,
    createTeam,
    findAllTeam,
    findMemberTeam,
    teamProject,
} from "../controllers/team.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/:work_key", checkAuth, createTeam);
router.post("/add-member/:team_key", checkAuth, addMemberTeam);
router.post("/team-project/:team_key", checkAuth, teamProject);
router.get("/", checkAuth, findAllTeam);
router.get("/list-member/:team_key", checkAuth, findMemberTeam);

export default router;
