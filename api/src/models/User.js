import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import Organization from "./Organization.js";

const { DataTypes } = Sequelize;

const User = db.define(
    "users",
    {
        userKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        email_token: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

// Organization.hasMany(User, { foreignKey: "org_key", sourceKey: "orgKey" });
// User.belongsTo(Organization, { foreignKey: "org_key" });

export default User;
