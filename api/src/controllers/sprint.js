import { ProjectHasUser } from "../models/Project.js";
import { Sprint, ProjectHasSprint } from "../models/Sprint.js";
import User from "../models/User.js";

export const createSprint = async (req, res, next) => {
    const { name_sprint, duration, start_date, end_date, sprint_goal, status } =
        req.body;
    try {
        const user = await User.findOne({
            where: { uuid: req.userId },
        });
        const project = await ProjectHasUser.findOne({
            where: { userKey: user.uuid },
        });
        const sprint = await Sprint.create({
            name_sprint: name_sprint,
            duration: duration,
            start_date: start_date,
            end_date: end_date,
            sprint_goal: sprint_goal,
            status: status,
        });
        const project_has_sprint = await ProjectHasSprint.create({
            projectKey: project.projectKey,
            sprintKey: sprint.uuid,
        });
        res.status(200).json({
            message: "successfully create sprint",
            data: {
                user: user.uuid,
                project: project.uuid,
                detai_sprint: sprint,
                sprint: {
                    project_key: project_has_sprint.projectKey,
                    sprint_key: project_has_sprint.sprintKey,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
