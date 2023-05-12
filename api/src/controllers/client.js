import fs from "fs";
import { Client } from "../models/index.js";
import upload from "../middleware/Multer.js";
import multer from "multer";

export const client = async (req, res, next) => {
    upload("avatar")(req, res, async (err) => {
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
        const { path } = req.file;
        const { name, description } = req.body;
        try {
            const client = await Client.create({
                client_key: "C-",
                name: name,
                description: description,
                photo: path,
            });
            await client.update({
                client_key: `C-${client.id}`,
            });
            res.status(201).json({
                success: true,
                message: "Successfully",
                data: client,
            });
        } catch (error) {
            fs.unlinkSync(path);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    });
};
