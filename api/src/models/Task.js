import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Task = db.define(
    "tasks",
    {
        taskKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name_team: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        task_description: {
            type: DataTypes.TEXT,
        },
        assigne: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        reporter: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "backlog",
            validate: {
                notEmpty: true,
            },
        },
        parent_key: {
            type: DataTypes.STRING,
            defaultValue: "null",
        },
        flag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: "false",
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

export { Task };
