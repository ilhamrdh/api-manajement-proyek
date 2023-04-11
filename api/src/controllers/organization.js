import { Organization, OrganizationHasUser } from "../models/Organization.js";

export const listAnggotaOrganization = async (req, res, next) => {
    try {
        const organization = await Organization.findOne({
            where: { uuid: req.params.id },
        });
        if (!organization) {
            return res.status(404).json({ message: "organization not found" });
        }
        const organizationHasUser = await OrganizationHasUser.findAll({
            attributes: ["userKey"],
            where: { organizationKey: organization.uuid },
        });
        res.status(200).json({
            data: {
                name_organization: organization.name_organization,
                anggota: organizationHasUser,
            },
        });
    } catch (error) {
        next(error);
    }
};
