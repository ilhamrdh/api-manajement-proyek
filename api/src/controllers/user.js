import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import { OrganizationHasUser } from "../models/Organization.js";

export const verify = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { emailToken: req.query.token },
        });
        if (user) {
            user.emailToken = null;
            user.verified = true;
            await user.save((err) => {
                if (err) {
                    res.status(500).json({ message: err });
                    return;
                }
            });
            res.status(200).json({ message: "sucess verified" });
        } else {
            res.status(400).json({ message: "email is not verified" });
        }
    } catch (error) {
        next(error);
    }
};

export const invite = async (req, res, next) => {
    const { email, role } = req.body;
    try {
        const checkEmail = await User.findOne({
            where: { email: email },
        });
        if (checkEmail) {
            return res.status(409).json({ message: "email already" });
        }
        const invitation_user = await User.findOne({
            where: { uuid: req.userId },
        });
        const organization_user = await OrganizationHasUser.findOne({
            where: { userKey: invitation_user.uuid },
        });
        const user = await User.create({
            username: email.toLowerCase(),
            email: email.toLowerCase(),
            password: "panding",
            role: role,
            emailToken: crypto.randomBytes(64).toString("hex"),
        });
        await OrganizationHasUser.create({
            organizationKey: organization_user.organizationKey,
            userKey: user.uuid,
            role: role,
        });
        let subject = `${invitation_user.username} is waiting for you to join them`;
        let content = `
        <div style="max-width:520px;margin:0 auto">
            <div style="vertical-align:top;text-align:left;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.005em;color:#091e42;line-height:20px;">
            <h1 style="margin-bottom:0;font-size:24px;font-weight:500;letter-spacing:-0.01em;color:#172b4d;line-height:28px;margin-top:40px">Your team is waiting for you to join them</h1>
            <h3 style="font-size:16px;font-weight:500;letter-spacing:-0.006em;color:#172b4d;line-height:20px;margin: top 5px;padding:0">${invitation_user.username} has invited you to collaborate</h3>
            <a href="http://localhost:9000/api/users/verify-invite?continue=${user.emailToken}"
                style="box-sizing:border-box;border-radius:3px;border-width:0;border:none;display:inline-flex;font-style:normal;font-size:inherit;line-height:24px;margin:0;outline:none;padding:4px 12px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none;background:#0052cc;color:#ffffff;">
                Join the team</a>
            <p style="color:#091e42;line-height:20px;margin-top:12px">Here's what ${invitation_user.username} and your team are using to work seamlessly and accomplish more,</p>
            </div>
        </div>
        `;
        sendEmail(email, subject, content);
        res.status(201).json({
            message: "Successfuly invited",
            data: {
                email: user.email,
                email_token: user.emailToken,
            },
        });
    } catch (error) {
        next(error);
    }
};
export const verifyInvite = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const checkUsername = await User.findOne({
            where: { username: username },
        });
        if (checkUsername) {
            return res.status(409).json({ message: "username already" });
        }
        const user = await User.findOne({
            where: { emailToken: req.query.continue },
        });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        if (user) {
            user.username = username;
            user.password = hash;
            user.emailToken = null;
            user.verified = true;
            await user.save((err) => {
                if (err) {
                    res.status(500).json({ message: err });
                    return;
                }
            });
            res.status(200).json({ message: "successfuly created account" });
        } else {
            res.status(400).json({ message: "token is not found" });
        }
    } catch (error) {
        next(error);
    }
};
