import { Sequelize } from "sequelize";
import { User, Workspace } from "../models/index.js";

export const createWorkspace = async (req, res, next) => {
    const { name_workspace } = req.body;
    try {
        const user = await User.findOne({
            where: { id: req.userId },
        });
        const workspace = await Workspace.create({
            workKey: "WORK",
            name_workspace: name_workspace,
            org_key: user.org_key,
        });
        await workspace.update({ workKey: `WORK-${workspace.id}` });
        res.status(201).json({
            message: "successfuly created",
            data: workspace,
        });
    } catch (error) {
        next(error);
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
            return res.status(404).json({ message: "username not found" });
        }
        const invitation_user = await User.findOne({
            where: { id: req.userId },
        });
        if (invitation_user.org_key === checkUsername.org_key) {
            console.log("ORGANISASI SAMA");
        } else {
            console.log("BEDA ORGANISASI");
        }
    } catch (error) {
        next(error);
    }
};
export const listWorkspace = async (req, res, next) => {};
export const findWorkspace = async (req, res, next) => {};
export const editWorkspace = async (req, res, next) => {};
