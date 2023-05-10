import { Sequelize } from "sequelize";
import Project from "../models/Project.js";
import Sprint from "../models/Sprint.js";
import { key } from "../utils/generateKey.js";

export const createSprint = async (req, res, next) => {
    const {
        sprint_name,
        duration,
        start_date,
        end_date,
        sprint_goal,
        status,
        project_key,
    } = req.body;
    const project = await Project.findOne({
        where: {
            project_key: Sequelize.where(
                Sequelize.fn("LOWER", Sequelize.col("project_key")),
                Sequelize.fn("LOWER", project_key)
            ),
        },
    });
    if (!project) {
        return res.status(404).json({
            success: false,
            message: "Project not found",
        });
    }
    try {
        const sprint = await Sprint.create({
            sprint_key: `P-`,
            sprint_name: sprint_name,
            duration: duration,
            start_date: start_date,
            end_date: end_date,
            sprint_goal: sprint_goal,
            status: status,
            project_key: project_key,
        });
        await sprint.update({
            sprint_key: `${key(project.project_name)}-${sprint.id}`,
        });
        res.status(201).json({
            success: true,
            message: "Sprint created successfully",
            data: sprint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
