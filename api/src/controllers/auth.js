import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Organization, User } from "../models/index.js";
import sendEmail from "../utils/sendEmail.js";
import { keyUser } from "../utils/generateKey.js";
import { Sequelize } from "sequelize";

export const register = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const checkUsername = await User.findOne({
            where: {
                username: Sequelize.where(
                    Sequelize.fn("LOWER", Sequelize.col("username")),
                    Sequelize.fn("LOWER", username)
                ),
            },
        });
        if (checkUsername) {
            return res.status(409).json({ message: "username already" });
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
            return res.status(409).json({ message: "email already" });
        }
        const organization = await Organization.create({
            orgKey: "ORG",
            name_organization: username + "_org",
        });
        await organization.update({ orgKey: `ORG-${organization.id}` });
        const user = await User.create({
            userKey: crypto.randomBytes(10).toString("hex"),
            username: username,
            email: email.toLowerCase(),
            password: hash,
            role: role,
            email_token: crypto.randomBytes(64).toString("hex"),
            org_key: organization.orgKey,
        });
        await user.update({
            userKey: `USER-${user.id}`,
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
            message: "Register successfuly",
            data: {
                organization: organization,
                user: user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ message: "wrong password or username" });
        }
        const payload = {
            id: user.id,
            userKey: user.userKey,
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
            .json({ message: "successfuly login", username: user.username });
    } catch (error) {
        next(error);
    }
};

export const Me = async (req, res, next) => {
    try {
        const user = await User.findOne({
            attributes: ["username", "email", "role"],
            where: {
                id: req.userId,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

export const logOut = async (req, res, next) => {
    const loggedIn = req.cookies.access_token;
    try {
        if (loggedIn) {
            res.clearCookie("access_token");
            res.status(200).json({ message: "success logout" });
        } else {
            res.status(401).json({ message: "not login" });
        }
    } catch (error) {
        next(error);
    }
};
