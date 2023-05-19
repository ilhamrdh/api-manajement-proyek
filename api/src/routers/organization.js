import express from "express";
import {
    findOrganization,
    listOrganization,
} from "../controllers/organization.js";
import { checkAuth } from "../middleware/authUser.js";
import {
    createWorkspace,
    inviteToWorkspace,
    listWorkspace,
} from "../controllers/workspace.js";
import {
    createTeam,
    addMemberTeam,
    findTeamWorkspace,
    findAllTeam,
    findTeamByKey,
    addProjectTeam,
} from "../controllers/team.js";
import {
    changeProjectName,
    createProject,
    deleteProject,
    findAllProject,
    projectHasTeam,
} from "../controllers/project.js";
import { createSprint, findAllSprint } from "../controllers/sprint.js";
import {
    commentTask,
    createTask,
    deleteTask,
    deletedAttachment,
    detailTask,
    listTask,
    taskAttachment,
    updateTaskName,
    updateTaskStatus,
} from "../controllers/task.js";
import { client, findAllClient } from "../controllers/client.js";
import {
    createStatus,
    deleteStatus,
    findAllStatus,
    updateStatus,
} from "../controllers/status.js";

const router = express.Router();

router.get("/members", checkAuth, listOrganization);
router.get("/:org_key/members", checkAuth, findOrganization);

router.post("/workspace", checkAuth, createWorkspace);
router.post("/workspace/invite-to-workspace", checkAuth, inviteToWorkspace);
router.get("/workspace", checkAuth, listWorkspace);

router.post("/workspace/team", checkAuth, createTeam);
router.post("/workspace/team/add-member", checkAuth, addMemberTeam);
router.post("/workspace/team/team-project", checkAuth, addProjectTeam);
router.get("/workspace/:work_key/team", checkAuth, findTeamWorkspace);
router.get("/workspace/team", checkAuth, findAllTeam);
router.get("/workspace/team/:team_key", checkAuth, findTeamByKey);

router.post("/project", checkAuth, createProject);
router.put("/project/:project_key", checkAuth, changeProjectName);
router.get("/project", checkAuth, findAllProject);
router.get("/project/teammates", checkAuth, projectHasTeam);
router.delete("/project/:project_key", checkAuth, deleteProject);

router.post("/project/sprint", checkAuth, createSprint);
router.get("/project/sprint", checkAuth, findAllSprint);

router.post("/project/task", checkAuth, createTask);
router.post("/project/task/comment", checkAuth, commentTask);
router.post("/project/task/upload/attachment", checkAuth, taskAttachment);
router.put("/project/task/:task_key/status", checkAuth, updateTaskStatus);
router.put("/project/task/change-name/:task_key", checkAuth, updateTaskName);
router.get("/project/task", checkAuth, listTask);
router.get("/project/task/:task_key/detail", checkAuth, detailTask);
router.delete("/project/task/:task_key", checkAuth, deleteTask);
router.delete("/project/task/:attachId", checkAuth, deletedAttachment);

router.post("/project/task/status", checkAuth, createStatus);
router.put("/project/task/status/:status_key", checkAuth, updateStatus);
router.get("/project/task/status", checkAuth, findAllStatus);
router.delete("/project/task/status/:status_key", checkAuth, deleteStatus);

router.post("/clients/add", checkAuth, client);
router.get("/clients", checkAuth, findAllClient);

export default router;
