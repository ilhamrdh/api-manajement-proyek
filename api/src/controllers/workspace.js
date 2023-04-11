import User from "../models/User.js";
import { Workspace, WorkspaceHasUser } from "../models/Workspace.js";

export const createWorkspace = async (req, res, next) => {
    const { nameWorkspace, description } = req.body;
    try {
        const user = await User.findOne({
            where: { uuid: req.userId },
        });
        const workspace = await Workspace.create({
            name_worspace: nameWorkspace,
            description: description,
        });
        const workspace_has_user = await WorkspaceHasUser.create({
            workspaceKey: workspace.uuid,
            userKey: user.uuid,
        });
        res.status(201).json({
            message: "Successfuly created",
            data: {
                workspace: workspace,
                anggota: workspace_has_user,
            },
        });
    } catch (error) {
        next(error);
    }
};
export const inviteToWorkspace = async (req, res, next) => {
    const { email } = req.body;
    try {
        const checkEmail = await User.findOne({
            where: { email: email },
        });
        if (!checkEmail) {
            return res.status(404).json({ message: "email not found" });
        }
        const invitation_user = await User.findOne({
            where: { uuid: req.userId },
        });
        const workspace_user = await WorkspaceHasUser.findOne({
            where: { userKey: invitation_user.uuid },
        });
        const workspace_has_user = await WorkspaceHasUser.create({
            workspaceKey: workspace_user.workspaceKey,
            userKey: checkEmail.uuid,
        });
        res.status(201).json({
            message: "Successfuly invited",
            data: {
                workspace: workspace_has_user,
            },
        });
    } catch (error) {
        next(error);
    }
};
export const listWorkspace = async (req, res, next) => {
    try {
        const workspace = await Workspace.findOne({
            where: {
                uuid: req.params.id,
            },
        });
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        let response;
        response = await WorkspaceHasUser.findAll({
            attributes: ["uuid", "workspaceKey", "userKey"],
            where: {
                workspaceKey: workspace.uuid,
            },
        });
        res.status(200).json({ data: response });
    } catch (error) {
        next(error);
    }
};
export const editWorkspace = async (req, res, next) => {};
export const findWorkspace = async (req, res, next) => {};
