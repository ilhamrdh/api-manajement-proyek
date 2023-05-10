import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Task = db.define(
    "tasks",
    {
        task_key: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        task_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        task_description: {
            type: DataTypes.TEXT,
        },
        assignee: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        reporter: {
            type: DataTypes.STRING(10),
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
            type: DataTypes.STRING(10),
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

const VotedTask = db.define(
    "voted_tasks",
    {
        task_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        user_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

const TaskAttachement = db.define(
    "task_attachment",
    {
        attach_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        attach_file: {
            type: DataTypes.STRING,
        },
        upload_by: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        task_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);
const TaskCommentHistory = db.define(
    "task_comment_history",
    {
        action: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true,
            },
        },
        type: {
            type: DataTypes.ENUM,
            values: ["comment", "history"],
            allowNull: false,
            validate: {
                isIn: {
                    args: [["comment", "history"]],
                    msg: "must be comment, or history",
                },
            },
        },
        task_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        user_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

export { Task, TaskAttachement, TaskCommentHistory, VotedTask };
