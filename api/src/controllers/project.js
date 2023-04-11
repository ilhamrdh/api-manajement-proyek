import { Op } from "sequelize";
import { Project, ProjectHasUser } from "../models/Project.js";
import User from "../models/User.js";
import { WorkspaceHasUser } from "../models/Workspace.js";

export const createProject = async (req, res, next) => {
    const { nameProject, role } = req.body;
    try {
        const user = await User.findOne({
            where: { uuid: req.userId },
        });
        const workspace = await WorkspaceHasUser.findOne({
            where: { userKey: user.uuid },
        });
        const projcet = await Project.create({
            name_project: nameProject,
            workspaceKey: workspace.workspaceKey,
        });
        const project_has_user = await ProjectHasUser.create({
            projectKey: projcet.uuid,
            userKey: user.uuid,
            role: role,
        });
        res.status(201).json({
            message: "successfully created project",
            data: {
                name_project: projcet,
                anggota: project_has_user,
            },
        });
    } catch (error) {
        next(error);
    }
};
export const inviteToProject = async (req, res, next) => {
    const { email, role } = req.body;
    try {
        const invitation_user = await User.findOne({
            where: { uuid: req.userId },
        });
        const user = await User.findOne({
            where: { email: email },
        });
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        }
        const project = await ProjectHasUser.findOne({
            where: { userKey: invitation_user.uuid },
        });
        const workspace = await WorkspaceHasUser.findOne({
            where: { userKey: user.uuid },
        });
        if (!workspace) {
            return res.status(400).json({ message: "not the same workspace" });
        }
        await ProjectHasUser.create({
            projectKey: project.projectKey,
            userKey: user.uuid,
            role: role,
        });
        res.status(200).json({
            message: `successfully invited ${user.username}`,
        });
    } catch (error) {
        next(error);
    }
};

export const findProject = async (req, res, next) => {
    try {
        const project = await Project.findOne({
            where: {
                uuid: req.params.id,
            },
        });
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }
        let response;
        response = await Project.findAll({
            // attributes: ["role", "uuid", "projectKey", "userKey"],
            // where: {
            //     uuid: project.uuid,
            // },
            attributes: ["username", "name_project"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                    on: { userKey: Sequelize.col("user.uuid") }, // Define LEFT OUTER JOIN condition
                },
                {
                    model: Project,
                    attributes: ["name_project"],
                    on: { projectKey: Sequelize.col("project.uuid") }, // Define LEFT OUTER JOIN condition
                    where: { uuid: project.uuid }, // Define WHERE condition
                },
            ],
            raw: true,
        });
        console.log("RESULT : ", response);
        res.status(200).json({
            data: response,
        });
    } catch (error) {
        next(error);
    }
};
