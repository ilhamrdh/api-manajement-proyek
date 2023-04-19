import Organization from "./Organization.js";
import User from "./User.js";
import Workspace from "./Workspace.js";
import { Team, TeamMember, TeamHasProject } from "./Team.js";
import Project from "./Project.js";
import Sprint from "./Sprint.js";
import { Task } from "./Task.js";

Organization.hasMany(User, { foreignKey: "org_key", sourceKey: "orgKey" });
User.belongsTo(Organization, { foreignKey: "org_key" });

Organization.hasMany(Workspace, { foreignKey: "org_key", sourceKey: "orgKey" });
Workspace.belongsTo(Organization, { foreignKey: "org_key" });

Workspace.hasMany(Team, { foreignKey: "work_key", sourceKey: "workKey" });
Team.belongsTo(Workspace, { foreignKey: "work_key" });

Team.hasMany(TeamMember, { foreignKey: "team_key", sourceKey: "teamKey" });
TeamMember.belongsTo(Team, { foreignKey: "team_key" });

Team.hasMany(TeamHasProject, { foreignKey: "team_key", sourceKey: "teamKey" });
TeamHasProject.belongsTo(Team, { foreignKey: "team_key" });
Project.hasMany(TeamHasProject, {
    foreignKey: "project_key",
    sourceKey: "projectKey",
});
TeamHasProject.belongsTo(Project, { foreignKey: "project_key" });

Project.hasMany(Sprint, { foreignKey: "project_key", sourceKey: "projectKey" });
Sprint.belongsTo(Project, { foreignKey: "project_key" });

export {
    User,
    Organization,
    Workspace,
    Team,
    TeamMember,
    TeamHasProject,
    Project,
    Sprint,
    Task,
};
