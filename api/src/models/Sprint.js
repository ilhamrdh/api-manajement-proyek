import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Sprint = db.define(
    "sprints",
    {
        sprint_key: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        sprint_name: {
            type: DataTypes.STRING(100),
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
        level: {
            type: DataTypes.ENUM,
            values: ["low", "medium", "high"],
            allowNull: false,
            validate: {
                isIn: {
                    args: [["low", "medium", "high"]],
                    msg: "must be low, medium, or high",
                },
            },
        },
        project_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

export default Sprint;
