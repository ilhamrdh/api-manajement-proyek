import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Organization = db.define(
    "organizations",
    {
        orgKey: {
            type: DataTypes.STRING,
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

export default Organization;
