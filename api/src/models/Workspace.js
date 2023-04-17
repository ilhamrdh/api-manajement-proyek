import { Sequelize } from "sequelize";
import db from "../configs/connection.js";
import Organization from "./Organization.js";

const { DataTypes } = Sequelize;

const Workspace = db.define(
    "workspaces",
    {
        workKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name_workspace: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    { freezeTableName: true }
);

// Organization.hasMany(Workspace, { foreignKey: "org_key", sourceKey: "orgKey" });
// Workspace.belongsTo(Organization, { foreignKey: "org_key" });

export default Workspace;
