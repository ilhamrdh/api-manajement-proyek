import express from "express";
import {
    findOrganization,
    listOrganization,
} from "../controllers/organization.js";
import { checkAuth } from "../middleware/authUser.js";
import {
    createWorkspace,
    findMemberWorkspace,
    findWorkspace,
    inviteToWorkspace,
    listWorkspace,
} from "../controllers/workspace.js";
import {
    addMemberTeam,
    createTeam,
    findAllTeam,
    findMemberTeam,
    teamProject,
} from "../controllers/team.js";
import { createProject, projectHasTeam } from "../controllers/project.js";
import { createSprint } from "../controllers/sprint.js";
import {
    commentTask,
    createTask,
    deletedAttachment,
    detailTask,
    listTask,
    taskAttachment,
} from "../controllers/task.js";

const router = express.Router();

router.get("/members", checkAuth, listOrganization);
router.get("/:org_key", checkAuth, findOrganization);

router.post("/workspace", checkAuth, createWorkspace);
router.post("/workspace/invite-to-workspace", checkAuth, inviteToWorkspace);
router.get("/workspace/list", checkAuth, listWorkspace);
router.get("/workspace/:work_key/members", checkAuth, findMemberWorkspace);
router.get("/workspace/:work_key/workspace", checkAuth, findWorkspace);

router.post("/workspace/team", checkAuth, createTeam);
router.post("/workspace/team/add-member", checkAuth, addMemberTeam);
router.post("/workspace/team/team-project", checkAuth, teamProject);
router.get("/workspace/team", checkAuth, findAllTeam);
router.get("/workspace/team/:team_key/member", checkAuth, findMemberTeam);

router.post("/project", checkAuth, createProject);
router.get("/project/list", checkAuth, projectHasTeam);

router.post("/project/sprint", checkAuth, createSprint);

router.post("/project/task", checkAuth, createTask);
router.post("/project/task/comment", checkAuth, commentTask);
router.post("/project/task/upload/attachment", checkAuth, taskAttachment);
router.get("/project/task", checkAuth, listTask);
router.get("/project/task/:task_key/detail", checkAuth, detailTask);
router.delete("/project/task/:attachId", checkAuth, deletedAttachment);

export default router;
