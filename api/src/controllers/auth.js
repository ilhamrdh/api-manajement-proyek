import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import fs from "fs";
import { Sequelize } from "sequelize";
import { Organization, User } from "../models/index.js";
import sendEmail from "../utils/sendEmail.js";
import upload from "../middleware/Multer.js";
import multer from "multer";

export const register = async (req, res, next) => {
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
        const { username, email, password, role } = req.body;
        const { path } = req.file;
        try {
            const checkUsername = await User.findOne({
                where: {
                    username: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("username")),
                        Sequelize.fn("LOWER", username)
                    ),
                },
            });
            if (checkUsername) {
                fs.unlinkSync(path);
                return res.status(409).json({
                    success: false,
                    message: "username already",
                });
            }
            const checkEmail = await User.findOne({
                where: {
                    email: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("email")),
                        Sequelize.fn("LOWER", email)
                    ),
                },
            });
            if (checkEmail) {
                fs.unlinkSync(path);
                return res.status(409).json({
                    success: false,
                    message: "Email already",
                });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const organization = await Organization.create({
                org_key: "ORG",
                organization_name: username + "_org",
            });
            await organization.update({ org_key: `ORG-${organization.id}` });
            const user = await User.create({
                user_key: "USER-",
                username: username,
                email: email.toLowerCase(),
                password: hash,
                role: role,
                photo: path,
                email_token: crypto.randomBytes(64).toString("hex"),
                org_key: organization.org_key,
            });
            await user.update({
                user_key: `USER-${user.id}`,
            });
            let subject = "Verify your email";
            let content = `
                <div style="max-width:520px;margin:0 auto">
                    <div style="vertical-align:top;text-align:left;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;">
                        <h1 style="margin-bottom:0;font-size:24px;font-weight:500;letter-spacing:-0.01em;color:#172b4d;line-height:28px;margin-top:40px">
                            You're nearly there!</h1>
                        <p style="color:#091e42;line-height:20px;margin-top:12px">Hi ${username},</p>
                        <p style="color:#091e42;line-height:20px;margin-top:12px">Please verify your mail to continue...</p>
                        <a href="http://localhost:9000/api/users/verify-email?token=${user.email_token}"
                            style="box-sizing:border-box;border-radius:3px;border-width:0;border:none;display:inline-flex;font-style:normal;font-size:inherit;line-height:24px;margin:0;outline:none;padding:4px 12px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none;background:#0052cc;color:#ffffff;">
                            Verify your email</a>
                    </div>
                </div>
                `;
            sendEmail(email, subject, content);
            res.status(201).json({
                success: true,
                message: "Successed register",
                data: user.email,
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

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("email")),
                    Sequelize.fn("LOWER", email)
                ),
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Wrong password or username",
            });
        }
        const payload = {
            id: user.id,
            user_key: user.user_key,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 24 * 17 * 60 * 60 * 60,
        });
        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 24 * 17 * 60 * 60 * 60,
        })
            .status(201)
            .json({
                success: true,
                message: "Login successfully",
                username: user.username,
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const logOut = async (req, res, next) => {
    const loggedIn = req.cookies.access_token;
    try {
        if (loggedIn) {
            res.clearCookie("access_token");
            res.status(200).json({
                success: true,
                message: "Successed logout",
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Not logged in yet",
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
