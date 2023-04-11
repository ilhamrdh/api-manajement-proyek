import { Task } from "../models/Taks.js";
import User from "../models/User.js";

export const createTask = async (req, res, next) => {
    const { name_task, description, email } = req.body;
    try {
        const user = await User.findOne({
            where: { uuid: req.userId },
        });
        const assigne = await User.findOne({
            where: { email: email },
        });
        if (!assigne) {
            return res.status(404).json({ message: "email not found" });
        }
        const task = await Task.create({
            name_task: name_task,
            description: description,
            assigne: assigne.email,
            reporter: user.email,
        });
        res.status(200).json({
            data: task,
        });
    } catch (error) {
        next(error);
    }
};
