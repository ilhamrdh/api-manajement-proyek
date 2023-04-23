import { Organization, User } from "../models/index.js";

export const listOrganization = async (req, res, next) => {
    try {
        const organization = await Organization.findAll({
            attributes: ["org_key", "organization_name"],
            include: [
                {
                    model: User,
                    attributes: ["username", "email", "role"],
                },
            ],
        });
        res.status(200).json({
            success: true,
            message: "Get members successfully",
            data: organization,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const findOrganization = async (req, res) => {
    const org_key = req.params.org_key;
    try {
        const checkOrg = await Organization.findOne({
            where: { org_key: org_key },
        });
        if (!checkOrg) {
            return res.status(404).json({ message: "Organization not found" });
        }
        const organization = await Organization.findOne({
            where: { org_key: org_key },
            attributes: ["org_key", "organization_name"],
            include: [
                {
                    model: User,
                    attributes: ["user_key", "username", "email", "role"],
                },
            ],
        });
        res.status(200).json({
            success: true,
            message: "Successed get member",
            data: organization,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
