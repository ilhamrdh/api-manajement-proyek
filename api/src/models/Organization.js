import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Organization = db.define(
    "organizations",
    {
        org_key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        organization_name: {
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
