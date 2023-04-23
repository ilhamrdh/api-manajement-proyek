import { Sequelize } from "sequelize";
import { User, Workspace, Organization, Team } from "../models/index.js";
import { key } from "../utils/generateKey.js";

export const createWorkspace = async (req, res, next) => {
    const { workspace_name } = req.body;
    try {
        const user = await User.findOne({
            where: { id: req.userId },
        });
        const workspace = await Workspace.create({
            work_key: "W",
            workspace_name: workspace_name,
            org_key: user.org_key,
        });
        await workspace.update({
            work_key: `${key(workspace_name)}-${workspace.id}`,
        });
        res.status(201).json({
            success: true,
            message: "Successed created workspace",
            data: workspace,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const inviteToWorkspace = async (req, res, next) => {
    const { username } = req.body;
    try {
        const checkUsername = await User.findOne({
            where: {
                username: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("username")),
                    Sequelize.fn("LOWER", username)
                ),
            },
        });
        if (!checkUsername) {
            return res
                .status(404)
                .json({ success: false, message: "username not found" });
        }
        const invitation_user = await User.findOne({
            where: { id: req.userId },
        });
        if (invitation_user.org_key === checkUsername.org_key) {
            console.log("ORGANISASI SAMA");
        } else {
            console.log("BEDA ORGANISASI");
        }
        res.status(200).json({
            success: true,
            message: "Successed invite user",
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const listWorkspace = async (req, res, next) => {
    try {
        const workspaces = await Workspace.findAll({
            attributes: ["work_key", "workspace_name"],
            include: [
                {
                    model: Organization,
                    attributes: ["org_key", "organization_name"],
                    include: [
                        {
                            model: User,
                            attributes: ["username", "email", "role"],
                        },
                    ],
                },
            ],
        });
        if (!workspaces) {
            return res.status(404).json({
                success: false,
                message: "Workspace doesn't exist yet",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successed",
            data: workspaces,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const findWorkspace = async (req, res, next) => {
    const work_key = req.params.work_key;
    try {
        const workspace = await Workspace.findOne({
            where: {
                work_key: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("work_key")),
                    Sequelize.fn("LOWER", work_key)
                ),
            },
            attributes: ["work_key", "workspace_name"],
            include: [
                {
                    model: Organization,
                    attributes: ["org_key", "organization_name"],
                    include: [
                        {
                            model: User,
                            attributes: ["username", "email", "role"],
                        },
                    ],
                },
            ],
        });
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successed",
            data: workspace,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const findTeam = async (req, res, next) => {
    const work_key = req.params.work_key;
    try {
        const workspace = await Workspace.findOne({
            where: {
                work_key: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("work_key")),
                    Sequelize.fn("LOWER", work_key)
                ),
            },
            attributes: ["work_key", "workspace_name"],
            include: [
                {
                    model: Team,
                    attributes: ["team_key", "team_name"],
                },
            ],
        });
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successed",
            data: workspace,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const editWorkspace = async (req, res, next) => {};
