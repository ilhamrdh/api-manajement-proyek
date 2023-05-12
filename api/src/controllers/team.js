import { Sequelize } from "sequelize";
import {
    Organization,
    Project,
    Team,
    TeamHasProject,
    TeamMember,
    User,
    Workspace,
} from "../models/index.js";
import { key } from "../utils/generateKey.js";

export const createTeam = async (req, res, next) => {
    const { team_name, work_key } = req.body;
    try {
        const workspace = await Workspace.findOne({
            where: { work_key: work_key },
        });
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }
        const team = await Team.create({
            team_key: "T-",
            team_name: team_name,
            work_key: work_key,
        });
        await team.update({ team_key: `${key(team_name)}-${team.id}` });
        res.status(201).json({
            success: true,
            message: "Create team successfully",
            data: team,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const findAllTeam = async (req, res, next) => {
    try {
        const teams = await Team.findAll({
            attributes: ["team_key", "team_name", "work_key"],
        });
        res.status(200).json({
            success: true,
            message: "Successed",
            data: teams,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const addMemberTeam = async (req, res, next) => {
    const { role, username, team_key } = req.body;
    try {
        const user = await User.findOne({
            where: {
                username: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("username")),
                    Sequelize.fn("LOWER", username)
                ),
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const team = await Team.findOne({
            where: { team_key: team_key },
            include: [{ model: Workspace }],
        });
        const members = await TeamMember.findOne({
            where: { user_key: user.user_key },
        });
        if (members) {
            return res.status(409).json({
                success: false,
                message: "User has been member team",
            });
        }
        if (user.org_key === team.workspace.org_key) {
            const member = await TeamMember.create({
                member_key: "M",
                role: role,
                user_key: user.user_key,
                team_key: team_key,
            });
            await member.update({ member_key: `M-${member.id}` });
            res.status(201).json({
                success: true,
                message: "Successed add member",
                data: {
                    member: {
                        user_key: member.user_key,
                        role: member.role,
                        team_key: member.team_key,
                    },
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: `${members.username} is not eligible to become a member of team ${team.team_name}`,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const findTeamWorkspace = async (req, res, next) => {
    const work_key = req.params.work_key;
    try {
        const workspace = await Workspace.findOne({
            where: {
                work_key: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("work_key")),
                    Sequelize.fn("LOWER", work_key)
                ),
            },
            attributes: ["work_key", "workspace_name"],
            include: [
                {
                    model: Team,
                    attributes: ["team_key", "team_name"],
                    include: [
                        {
                            model: TeamMember,
                            attributes: ["member_key", "role"],
                            include: [
                                {
                                    model: User,
                                    attributes: ["username"],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successed",
            data: workspace,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const addProjectTeam = async (req, res, next) => {
    const { project_name, team_key } = req.body;
    try {
        const project = await Project.findOne({
            where: {
                project_name: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("project_name")),
                    Sequelize.fn("LOWER", project_name)
                ),
            },
        });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const team = await Team.findOne({
            where: { team_key: team_key },
        });
        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }
        const checkProject = await TeamHasProject.findOne({
            where: { project_key: project.project_key },
        });
        if (checkProject) {
            return res.status(400).json({
                success: false,
                message: "the project already has a team",
            });
        }
        const teamProject = await TeamHasProject.create({
            team_key: team_key,
            project_key: project.project_key,
        });
        res.status(200).json({
            success: true,
            message: "Team has been add project",
            data: teamProject,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const findTeamByKey = async (req, res, next) => {
    const team_key = req.params.team_key;
    try {
        const team = await Team.findOne({
            where: {
                team_key: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("team_key")),
                    Sequelize.fn("LOWER", team_key)
                ),
            },
            attributes: ["team_key"],
        });
        if (!team) {
            return res.status(400).json({
                success: false,
                message: "Team not found",
            });
        }
        const teamMember = await TeamMember.findAll({
            where: { team_key: team.team_key },
            attributes: ["team_key", "role"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });

        res.status(200).json({
            success: true,
            message: "Successed",
            data: teamMember,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
