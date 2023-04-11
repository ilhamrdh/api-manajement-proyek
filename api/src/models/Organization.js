import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

export const Organization = db.define(
    "organizations",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        name_organization: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    }
);
export const OrganizationHasUser = db.define(
    "org_has_user",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

Organization.hasMany(OrganizationHasUser, {
    foreignKey: "organizationKey",
    sourceKey: "uuid",
});
OrganizationHasUser.belongsTo(Organization, { foreignKey: "organizationKey" });
User.hasMany(OrganizationHasUser, {
    foreignKey: "userKey",
    sourceKey: "uuid",
});
OrganizationHasUser.belongsTo(User, { foreignKey: "userKey" });
