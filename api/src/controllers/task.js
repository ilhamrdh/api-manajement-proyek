import { Sequelize } from "sequelize";
import multer from "multer";
import fs from "fs";
import {
    Task,
    TaskAttachement,
    TaskCommentHistory,
    User,
} from "../models/index.js";
import { key } from "../utils/generateKey.js";
import upload from "../middleware/Multer.js";

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
            message: "New task created sucessfully",
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
        const tasks = await Task.findAll();
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

export const detailTask = async (req, res, next) => {
    const task_key = req.params.task_key;
    try {
        const tasks = await Task.findOne({
            where: { task_key: task_key },
            include: [
                {
                    model: User,
                    as: "reporter_task",
                    attributes: ["username"],
                },
                {
                    model: User,
                    as: "assignee_task",
                    attributes: ["username"],
                },
                {
                    model: TaskCommentHistory,
                    as: "commnet_task",
                    attributes: ["type", "action"],
                    include: [
                        {
                            model: User,
                            attributes: ["username"],
                        },
                    ],
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

export const taskAttachment = (req, res, next) => {
    upload("attachment")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        } else if (err) {
            if (err.code === "FILE_TYPE_NOT_ALLOWED") {
                return res.status(400).json({
                    success: false,
                    message: "File type not allowed",
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        const { originalname, filename, path, mimetype, size } = req.file;
        const { attach_name, task_key } = req.body;
        try {
            const user = await User.findOne({
                where: { id: req.userId },
            });
            const attach = await TaskAttachement.create({
                attach_name: attach_name,
                attach_file: path,
                task_key: task_key,
                upload_by: user.user_key,
            });
            res.status(200).json({
                success: true,
                message: "Successed",
                data: attach,
                info: {
                    originalname: originalname,
                    filename: filename,
                    path: path,
                    mimetype: mimetype,
                    size: size,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    });
};

export const deletedAttachment = async (req, res, next) => {
    const { attachId } = req.params.attachId;
    try {
        const attachment = await TaskAttachement.findOne(attachId);
        if (!attachment) {
            return res.status(404).json({ message: "Attachment not found" });
        }
        const filePath = attachment.attach_file;
        fs.unlinkSync(filePath);
        await attachment.destroy();
        res.status(200).json({
            success: true,
            message: "Attachment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const commentTask = async (req, res, next) => {
    const { type, action, task_key } = req.body;
    try {
        const user = await User.findOne({
            where: { id: req.userId },
        });
        const task = await Task.findOne({
            where: { task_key: task_key },
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const comment = await TaskCommentHistory.create({
            type: type,
            action: action,
            task_key: task_key,
            user_key: user.user_key,
        });
        res.status(200).json({
            success: true,
            message: "Successed",
            data: {
                comment: {
                    type: comment.type,
                    action: comment.action,
                    task: task.task_name,
                    user: user.username,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
