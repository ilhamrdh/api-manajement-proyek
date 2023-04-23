import { Sequelize } from "sequelize";
import { Task, User } from "../models/index.js";
import { key } from "../utils/generateKey.js";

export const createTask = async (req, res, next) => {
    const {
        task_name,
        task_description,
        assignee,
        reporter,
        status,
        parent_key,
        flag,
    } = req.body;
    try {
        const assignee_name = await User.findOne({
            where: {
                username: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("username")),
                    Sequelize.fn("LOWER", assignee)
                ),
            },
        });
        const reporter_name = await User.findOne({
            where: {
                username: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("username")),
                    Sequelize.fn("LOWER", reporter)
                ),
            },
        });
        if (!assignee_name || !reporter_name) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const task = await Task.create({
            task_key: "T-",
            task_name: task_name,
            task_description: task_description,
            assignee: assignee_name.user_key,
            reporter: reporter_name.user_key,
            status: status,
            parent_key: parent_key,
            flag: flag,
        });
        await task.update({ task_key: `${key(task_name)}-${task.id}` });
        res.status(201).json({
            success: true,
            message: "Successed create task",
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const listTask = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            include: [
                {
                    model: User,
                    as: "reporter_user",
                    attributes: ["username"],
                },
                {
                    model: User,
                    as: "assignee_user",
                    attributes: ["username"],
                },
            ],
        });
        res.status(200).json({
            success: true,
            message: "Successed",
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
