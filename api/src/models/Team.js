import { Sequelize } from "sequelize";
import db from "../configs/connection.js";

const { DataTypes } = Sequelize;

const Team = db.define(
    "teams",
    {
        teamKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name_team: {
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
const TeamMember = db.define(
    "team_member",
    {
        memberKey: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        role: {
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
const TeamHasProject = db.define(
    "team_has_project",
    {},
    {
        freezeTableName: true,
    }
);

export { Team, TeamMember, TeamHasProject };
