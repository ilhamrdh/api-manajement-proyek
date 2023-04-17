import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Project = db.define(
    "projects",
    {
        projectKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name_project: {
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
export default Project;
