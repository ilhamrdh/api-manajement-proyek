import Organization from "./Organization.js";
import User from "./User.js";
import Workspace from "./Workspace.js";
import { Team, TeamMember, TeamHasProject } from "./Team.js";
import Project from "./Project.js";
import Sprint from "./Sprint.js";
import {
    Task,
    TaskAttachement,
    TaskCommentHistory,
    VotedTask,
} from "./Task.js";

Organization.hasMany(User, {
    foreignKey: "org_key",
    sourceKey: "org_key",
});
User.belongsTo(Organization, {
    foreignKey: "org_key",
    targetKey: "org_key",
});

Organization.hasMany(Workspace, {
    foreignKey: "org_key",
    sourceKey: "org_key",
});
Workspace.belongsTo(Organization, {
    foreignKey: "org_key",
    targetKey: "org_key",
});

Workspace.hasMany(Team, {
    foreignKey: "work_key",
    sourceKey: "work_key",
});
Team.belongsTo(Workspace, {
    foreignKey: "work_key",
    targetKey: "work_key",
});

Team.hasMany(TeamMember, {
    foreignKey: "team_key",
    sourceKey: "team_key",
});
TeamMember.belongsTo(Team, {
    foreignKey: "team_key",
    targetKey: "team_key",
});

User.hasMany(TeamMember, {
    foreignKey: "user_key",
    sourceKey: "user_key",
});
TeamMember.belongsTo(User, {
    foreignKey: "user_key",
    targetKey: "user_key",
});

Team.hasMany(TeamHasProject, {
    foreignKey: "team_key",
    sourceKey: "team_key",
});
TeamHasProject.belongsTo(Team, {
    foreignKey: "team_key",
    targetKey: "team_key",
});

Project.hasMany(TeamHasProject, {
    as: "teammate",
    foreignKey: "project_key",
    sourceKey: "project_key",
});
TeamHasProject.belongsTo(Project, {
    as: "teammate",
    foreignKey: "project_key",
    targetKey: "project_key",
});

Project.hasMany(Sprint, {
    foreignKey: "project_key",
    sourceKey: "project_key",
});
Sprint.belongsTo(Project, {
    foreignKey: "project_key",
});

Task.belongsTo(User, {
    as: "assignee_user",
    foreignKey: "assignee",
    targetKey: "user_key",
});
Task.belongsTo(User, {
    as: "reporter_user",
    foreignKey: "reporter",
    targetKey: "user_key",
});

VotedTask.belongsTo(Task, {
    foreignKey: "task_key",
    targetKey: "task_key",
});
User.hasMany(VotedTask, {
    foreignKey: "user_key",
    sourceKey: "user_key",
});
VotedTask.belongsTo(User, {
    foreignKey: "user_key",
    targetKey: "user_key",
});

TaskAttachement.belongsTo(Task, {
    foreignKey: "task_key",
    targetKey: "task_key",
});
TaskAttachement.belongsTo(User, {
    foreignKey: "upload_by",
    targetKey: "user_key",
});

TaskCommentHistory.belongsTo(Task, {
    foreignKey: "task_key",
    targetKey: "task_key",
});
TaskCommentHistory.belongsTo(User, {
    foreignKey: "user_key",
    targetKey: "user_key",
});
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
    VotedTask,
    TaskAttachement,
    TaskCommentHistory,
};
