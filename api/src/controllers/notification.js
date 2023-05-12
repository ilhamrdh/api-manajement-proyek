import { Notification } from "../models/index.js";

export const notification = async (req, res, next) => {
    const { values, for_user_id } = req.body;
    try {
        const notif = Notification.create({
            values: values,
            for_user_id: for_user_id,
        });
        res.status(201).json({
            success: true,
            message: "Successfully",
            data: notif,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
