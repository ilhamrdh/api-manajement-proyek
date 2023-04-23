import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Workspace = db.define(
    "workspaces",
    {
        work_key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        workspace_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        org_key: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

export default Workspace;
