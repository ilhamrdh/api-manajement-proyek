import { Sequelize } from "sequelize";
import { Project, Team, TeamHasProject } from "../models/index.js";
import { key } from "../utils/generateKey.js";

export const createProject = async (req, res, next) => {
    const { project_name, client_key, level } = req.body;
    try {
        const checkProject = await Project.findOne({
            where: {
                project_name: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("project_name")),
                    Sequelize.fn("LOWER", project_name)
                ),
            },
        });
        if (checkProject) {
            return res.status(409).json({
                success: false,
                message: "Project name already",
            });
        }
        const project = await Project.create({
            project_key: `P`,
            project_name: project_name,
            level: level,
            client_key: client_key,
        });
        await project.update({
            project_key: `${key(project_name)}-${project.id}`,
        });
        res.status(201).json({
            success: true,
            message: "Successed created project",
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const projectHasTeam = async (req, res, next) => {
    try {
        const project = await Project.findAll({
            attributes: ["project_key", "project_name"],
            include: [
                {
                    model: TeamHasProject,
                    attributes: ["team_key", "project_key"],
                    as: "teammate",
                    include: [
                        {
                            model: Team,
                            attributes: ["team_name"],
                        },
                    ],
                },
            ],
        });
        res.status(200).json({
            success: true,
            message: "Successed",
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const changeProjectName = async (req, res, next) => {
    const { project_name } = req.body;
    const project_key = req.params.project_key;
    try {
        const checkProject = await Project.findOne({
            where: {
                project_name: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("project_name")),
                    Sequelize.fn("LOWER", project_name)
                ),
            },
        });
        if (checkProject) {
            return res.status(409).json({
                success: false,
                message: "Project name already",
            });
        }
        const project = await Project.findOne({
            where: { project_key: project_key },
        });
        if (project) {
            project.project_name = project_name;
            await project.save((err) => {
                if (err) {
                    return res.status(500).json({ message: err });
                }
            });
        }
        res.status(200).json({
            success: false,
            message: "Successfully updated project name",
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
