import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Project = db.define(
    "projects",
    {
        project_key: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        project_name: {
            type: DataTypes.STRING(100),
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
