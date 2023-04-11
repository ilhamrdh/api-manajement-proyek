import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

export const Workspace = db.define(
    "workspaces",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        name_worspace: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    { freezeTableName: true }
);
export const WorkspaceHasUser = db.define(
    "workspace_has_user",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
    },
    { freezeTableName: true }
);
Workspace.hasMany(WorkspaceHasUser, {
    foreignKey: "workspaceKey",
    sourceKey: "uuid",
});
WorkspaceHasUser.belongsTo(Workspace, { foreignKey: "workspaceKey" });
User.hasMany(WorkspaceHasUser, {
    foreignKey: "userKey",
    sourceKey: "uuid",
});
WorkspaceHasUser.belongsTo(User, { foreignKey: "userKey" });
