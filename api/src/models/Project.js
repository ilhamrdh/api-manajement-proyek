import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Project = db.define(
    "projects",
    {
        project_key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        project_name: {
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
