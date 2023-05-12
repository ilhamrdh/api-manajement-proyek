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
        optimistic_time: {
            type: DataTypes.FLOAT(4),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        mostlikely_time: {
            type: DataTypes.FLOAT(4),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pessimistic_time: {
            type: DataTypes.FLOAT(4),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        status_key: {
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
        reporter: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

const TaskAssigner = db.define(
    "task_assigner",
    {
        task_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        assignee: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

const TaskWatcher = db.define(
    "task_watcher",
    {
        task_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        watcher_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

const TaskStatus = db.define(
    "task_status",
    {
        status_key: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING(255),
        },
    },
    { freezeTableName: true }
);

const TaskActivities = db.define(
    "task_activities",
    {
        task_key: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        activity: {
            type: DataTypes.STRING,
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

export {
    Task,
    TaskAssigner,
    TaskWatcher,
    TaskStatus,
    TaskActivities,
    TaskAttachement,
    TaskCommentHistory,
    VotedTask,
};
