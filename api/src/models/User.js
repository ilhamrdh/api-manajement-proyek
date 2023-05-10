import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const User = db.define(
    "users",
    {
        user_key: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },
        email: {
            type: DataTypes.STRING(100),
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
            type: DataTypes.ENUM,
            values: ["admin", "user"],
            defaultValue: "admin",
            allowNull: false,
            validate: {
                isIn: {
                    args: [["admin", "user"]],
                    msg: "must be admin, or user",
                },
            },
        },
        photo: {
            type: DataTypes.STRING,
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
        org_key: {
            type: DataTypes.STRING(10),
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

export default User;
