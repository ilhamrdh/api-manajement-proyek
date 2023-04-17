import { Organization, User } from "../models/index.js";

export const anggotaOrganization = async (req, res, next) => {
    const orgKey = req.params.orgKey;
    try {
        const user = await User.findAll({
            attributes: ["username", "email", "role"],
            where: {
                org_key: orgKey,
            },
        });
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};
