import Organization from "./Organization.js";
import User from "./User.js";
import Workspace from "./Workspace.js";
import { Team, TeamMember, TeamHasProject } from "./Team.js";
import Project from "./Project.js";
import Sprint from "./Sprint.js";
import { Task, TaskAssigner, TaskWatcher, TaskActivities, TaskStatus, TaskAttachement, TaskCommentHistory, VotedTask,} from "./Task.js";
import Notification from "./Notification.js";
import Client from "./Client.js";

Organization.hasMany(User, { foreignKey: "org_key", sourceKey: "org_key" });
User.belongsTo(Organization, { foreignKey: "org_key", targetKey: "org_key" });

Organization.hasMany(Workspace, { foreignKey: "org_key", sourceKey: "org_key" });
Workspace.belongsTo(Organization, { foreignKey: "org_key", targetKey: "org_key" });

Workspace.hasMany(Team, { foreignKey: "work_key", sourceKey: "work_key" });
Team.belongsTo(Workspace, { foreignKey: "work_key", targetKey: "work_key" });

Team.hasMany(TeamMember, { foreignKey: "team_key", sourceKey: "team_key" });
TeamMember.belongsTo(Team, { foreignKey: "team_key", targetKey: "team_key" });

User.hasMany(TeamMember, { foreignKey: "user_key", sourceKey: "user_key" });
TeamMember.belongsTo(User, { foreignKey: "user_key", targetKey: "user_key" });

Team.hasMany(TeamHasProject, { foreignKey: "team_key", sourceKey: "team_key" });
TeamHasProject.belongsTo(Team, { foreignKey: "team_key", targetKey: "team_key" });

Project.hasMany(TeamHasProject, { as: "teammate", foreignKey: "project_key", sourceKey: "project_key" });
TeamHasProject.belongsTo(Project, { as: "teammate", foreignKey: "project_key", targetKey: "project_key" });

Project.belongsTo(Client, {foreignKey: "client_key", targetKey: "client_key"})

Project.hasMany(Sprint, { foreignKey: "project_key",sourceKey: "project_key"});
Sprint.belongsTo(Project, { foreignKey: "project_key" });

Task.belongsTo(TaskStatus,{foreignKey:"status_key", targetKey:"status_key"});

Task.belongsTo(User, {as: "reporter_task",foreignKey: "reporter",targetKey: "user_key"});

Task.hasMany(TaskAssigner,{foreignKey:"task_key", sourceKey:"task_key"});
TaskAssigner.belongsTo(Task, {foreignKey:"task_key", sourceKey:"task_key"});

User.hasMany(TaskAssigner,{foreignKey:"assignee", sourceKey:"user_key"})
TaskAssigner.belongsTo(User,{ foreignKey:"assignee", sourceKey:"user_key" })

Task.hasMany(TaskWatcher,{foreignKey:"task_key", sourceKey:"task_key"});
TaskWatcher.belongsTo(Task, {foreignKey:"task_key", sourceKey:"task_key"});

User.hasMany(TaskWatcher,{foreignKey:"watcher_key", sourceKey:"user_key"})
TaskWatcher.belongsTo(User,{ foreignKey:"watcher_key", sourceKey:"user_key" })

Task.hasMany(TaskActivities,{foreignKey:"task_key", sourceKey:"task_key"});
TaskActivities.belongsTo(Task, {foreignKey:"task_key", sourceKey:"task_key"});

User.hasMany(TaskActivities,{foreignKey:"user_key", sourceKey:"user_key"});
TaskActivities.belongsTo(User, {foreignKey:"user_key", sourceKey:"user_key"});

VotedTask.belongsTo(Task, { foreignKey: "task_key", targetKey: "task_key" });
User.hasMany(VotedTask, { foreignKey: "user_key", sourceKey: "user_key" });
VotedTask.belongsTo(User, { foreignKey: "user_key", targetKey: "user_key" });

TaskAttachement.belongsTo(Task, { foreignKey: "task_key", targetKey: "task_key" });
TaskAttachement.belongsTo(User, { foreignKey: "upload_by", targetKey: "user_key" });

Task.hasMany(TaskCommentHistory, { as: "commnet_task", foreignKey: "task_key", sourceKey: "task_key" });
TaskCommentHistory.belongsTo(Task, { foreignKey: "task_key", targetKey: "task_key" });
User.hasMany(TaskCommentHistory, { foreignKey: "user_key", sourceKey: "user_key" });
TaskCommentHistory.belongsTo(User, { foreignKey: "user_key", targetKey: "user_key" });

Notification.belongsTo(User,{ foreignKey:"for_user_id", sourceKey:"id" })

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
    TaskAssigner,
    TaskWatcher,
    TaskActivities,
    TaskStatus,
    VotedTask,
    TaskAttachement,
    TaskCommentHistory,
    Notification,
    Client,
};
