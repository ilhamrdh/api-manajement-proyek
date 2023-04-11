import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import { Project } from "./Project.js";

const { DataTypes } = Sequelize;

export const Sprint = db.define(
    "sprints",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        name_sprint: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        start_date: {
            type: DataTypes.DATE,
        },
        end_date: {
            type: DataTypes.DATE,
        },
        sprint_goal: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["not start", "on progress", "completed"],
            defaultValue: "not start",
            allowNull: false,
            validate: {
                isIn: {
                    args: [["not start", "on progress", "completed"]],
                    msg: "must be not start, on progress, or completed",
                },
            },
        },
    },
    { freezeTableName: true }
);

export const ProjectHasSprint = db.define(
    "project_has_sprint",
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

Sprint.hasMany(ProjectHasSprint, {
    foreignKey: "sprintKey",
    sourceKey: "uuid",
});
ProjectHasSprint.belongsTo(Sprint, { foreignKey: "sprintKey" });
Project.hasMany(ProjectHasSprint, {
    foreignKey: "projectKey",
    sourceKey: "uuid",
});
ProjectHasSprint.belongsTo(Project, { foreignKey: "projectKey" });
