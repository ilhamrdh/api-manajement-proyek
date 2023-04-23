import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import Project from "./Project.js";

const { DataTypes } = Sequelize;

const Sprint = db.define(
    "sprints",
    {
        sprint_key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        sprint_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        sprint_goal: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM,
            values: ["not_start", "on_progress", "completed"],
            defaultValue: "not_start",
            allowNull: false,
            validate: {
                isIn: {
                    args: [["not_start", "on_progress", "completed"]],
                    msg: "must be not_start, on_progress, or completed",
                },
            },
        },
        project_key: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

export default Sprint;
