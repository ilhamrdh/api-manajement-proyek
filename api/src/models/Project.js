import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import User from "./User.js";
import { Workspace } from "./Workspace.js";

const { DataTypes } = Sequelize;

export const Project = db.define(
    "projects",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        name_project: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

export const ProjectHasUser = db.define(
    "project_has_user",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        },
    },
    { freezeTableName: true }
);
Workspace.hasMany(Project, {
    foreignKey: "workspaceKey",
    sourceKey: "uuid",
});
Project.belongsTo(Workspace, { foreignKey: "workspaceKey" });
Project.hasMany(ProjectHasUser, {
    foreignKey: "projectKey",
    sourceKey: "uuid",
});
ProjectHasUser.belongsTo(Project, { foreignKey: "projectKey" });
User.hasMany(ProjectHasUser, {
    foreignKey: "userKey",
    sourceKey: "uuid",
});
ProjectHasUser.belongsTo(User, { foreignKey: "userKey" });
