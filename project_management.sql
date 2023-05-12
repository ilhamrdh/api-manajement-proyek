DROP TABLE IF EXISTS "public"."application_id";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."application_id" (
    "id" uuid NOT NULL,
    "application" varchar(150),
    "status" bool,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "platform" varchar(150),
    "deletedAt" timestamp,
    "application_key" varchar(150),
    "env_key" varchar(50),
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."application_id"."platform" IS 'web/mobile/desktop';

DROP TABLE IF EXISTS "public"."audit_trails";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS audit_trails_id_seq;

-- Table Definition
CREATE TABLE "public"."audit_trails" (
    "id" int4 NOT NULL DEFAULT nextval('audit_trails_id_seq'::regclass),
    "user_id" varchar(36),
    "role_id" varchar(36),
    "req_headers" text,
    "req_body" text,
    "res_headers" text,
    "res_body" text,
    "req_date" timestamp,
    "res_date" timestamp,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "status" varchar(50),
    "url" varchar(255),
    "method" varchar(25),
    "res_time" int4,
    "module" varchar(50),
    "description" varchar(150),
    "application_id" uuid,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."clients";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS clients_id_seq;

-- Table Definition
CREATE TABLE "public"."clients" (
    "id" int4 NOT NULL DEFAULT nextval('clients_id_seq'::regclass),
    "client" varchar(150),
    "description" text,
    "avatar" varchar(150),
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."date_of_holiday";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS date_of_holiday_id_seq;

-- Table Definition
CREATE TABLE "public"."date_of_holiday" (
    "id" int4 NOT NULL DEFAULT nextval('date_of_holiday_id_seq'::regclass),
    "date" date,
    "description" varchar(150),
    "createdAt" timestamp,
    "updatedAt" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."kanban";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_id_seq'::regclass),
    "name" varchar(150),
    "type" varchar(50),
    "description" text,
    "cover" varchar(150),
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "milestone_id" int4,
    "project_id" int4,
    "assign_by" int4,
    "level" varchar(50),
    "start_date" date,
    "end_date" date,
    "value" numeric,
    "list_id" int4,
    "deletedAt" timestamp,
    "point" numeric DEFAULT 0,
    "completedAt" timestamp,
    "status" varchar(10) DEFAULT 'opened'::character varying,
    "optimistic_time" float4,
    "mostlikely_time" float4,
    "pessimistic_time" float4,
    "parent_id" int4,
    "objective" bool,
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."kanban"."type" IS 'list/card';
COMMENT ON COLUMN "public"."kanban"."level" IS 'low/medium/high';

DROP TABLE IF EXISTS "public"."kanban_activities";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_activities_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban_activities" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_activities_id_seq'::regclass),
    "kanban_id" int4,
    "user_id" int4,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "values" varchar(255),
    "list_id" int4,
    "comment_id" int4,
    "checklist_id" int4,
    "read_notif" int2 DEFAULT 0,
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."kanban_activities"."values" IS 'json activity';

DROP TABLE IF EXISTS "public"."kanban_attachments";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_attachments_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban_attachments" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_attachments_id_seq'::regclass),
    "attachment" varchar(150),
    "file_name" varchar(150),
    "kanban_id" int4,
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."kanban_checklist";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_checklist_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban_checklist" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_checklist_id_seq'::regclass),
    "name" varchar(255),
    "status" varchar(50),
    "kanban_id" int4,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "parent_id" int4,
    "type" varchar(15),
    "parent_kanban_id" int4,
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."kanban_checklist"."status" IS 'checked/uncheck';
COMMENT ON COLUMN "public"."kanban_checklist"."type" IS 'head/item';

DROP TABLE IF EXISTS "public"."kanban_comments";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_comments_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban_comments" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_comments_id_seq'::regclass),
    "kanban_id" int4,
    "user_id" int4,
    "comment" text,
    "parent_id" int4 DEFAULT 0,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."kanban_labels";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_labels_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban_labels" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_labels_id_seq'::regclass),
    "kanban_id" int4,
    "label_id" int4,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."kanban_members";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kanban_members_id_seq;

-- Table Definition
CREATE TABLE "public"."kanban_members" (
    "id" int4 NOT NULL DEFAULT nextval('kanban_members_id_seq'::regclass),
    "kanban_id" int4,
    "user_id" int4,
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."kritiksaran";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kritiksaran_id_seq;

-- Table Definition
CREATE TABLE "public"."kritiksaran" (
    "id" int4 NOT NULL DEFAULT nextval('kritiksaran_id_seq'::regclass),
    "user_id" int4,
    "pesan" text,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."log_auth";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."log_auth" (
    "id" uuid NOT NULL,
    "authentication" text,
    "status" bool,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "bar" text,
    "deletedAt" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."notifications";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS notifications_id_seq;

-- Table Definition
CREATE TABLE "public"."notifications" (
    "id" int4 NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
    "kanban_id" int4,
    "user_id" int4,
    "values" varchar(255),
    "list_id" int4,
    "comment_id" int4,
    "checklist_id" int4,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "read_notif" int2 DEFAULT 0,
    "for_user_id" int4
);

DROP TABLE IF EXISTS "public"."profile_invite";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS profile_invite_id_seq;

-- Table Definition
CREATE TABLE "public"."profile_invite" (
    "id" int4 NOT NULL DEFAULT nextval('profile_invite_id_seq'::regclass),
    "profile_id" int4,
    "email" varchar(150),
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    "status" varchar(20),
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."profile_invite"."status" IS 'request/accept';

DROP TABLE IF EXISTS "public"."profiles";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS profiles_id_seq;

-- Table Definition
CREATE TABLE "public"."profiles" (
    "id" int4 NOT NULL DEFAULT nextval('profiles_id_seq'::regclass),
    "profile" varchar(150),
    "key" varchar(50),
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    "description" varchar(255),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."project_labels";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS project_labels_id_seq;

-- Table Definition
CREATE TABLE "public"."project_labels" (
    "id" int4 NOT NULL DEFAULT nextval('project_labels_id_seq'::regclass),
    "project_id" int4,
    "label" varchar(50),
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."project_lists";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS project_lists_id_seq;

-- Table Definition
CREATE TABLE "public"."project_lists" (
    "id" int4 NOT NULL DEFAULT nextval('project_lists_id_seq'::regclass),
    "list" varchar(50),
    "project_id" int4,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    "urutan" int2,
    "value" numeric,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."project_members";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS project_members_id_seq;

-- Table Definition
CREATE TABLE "public"."project_members" (
    "id" int4 NOT NULL DEFAULT nextval('project_members_id_seq'::regclass),
    "project_id" int4,
    "user_id" int4,
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."project_milestones";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS project_milestones_id_seq;

-- Table Definition
CREATE TABLE "public"."project_milestones" (
    "id" int4 NOT NULL DEFAULT nextval('project_milestones_id_seq'::regclass),
    "name" varchar(255),
    "start_date" date,
    "end_date" date,
    "description" text,
    "created_at" timestamp,
    "updated_at" timestamp,
    "project_id" int4,
    "level" varchar(50),
    "point" int4 DEFAULT 0,
    "value" int4 DEFAULT 0,
    "optimistic_time" float4,
    "mostlikely_time" float4,
    "pessimistic_time" float4,
    "parent_id" int4,
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."project_milestones"."level" IS 'low/medium/high';

DROP TABLE IF EXISTS "public"."projects";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS projects_id_seq;

-- Table Definition
CREATE TABLE "public"."projects" (
    "id" int4 NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    "name" varchar(255),
    "avatar" varchar(150),
    "start_date" date,
    "end_date" date,
    "description" text,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "client_id" int4,
    "profile_id" int4,
    "value" numeric DEFAULT 0,
    "status" varchar(15),
    "deletedAt" timestamp,
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."projects"."status" IS 'opened/closed';

DROP TABLE IF EXISTS "public"."teams";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS departments_id_seq;

-- Table Definition
CREATE TABLE "public"."teams" (
    "id" int2 NOT NULL DEFAULT nextval('departments_id_seq'::regclass),
    "team" varchar(50),
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    "avatar" varchar(150),
    "description" text,
    "team_leader" int4,
    "profile_id" int4,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."user_profiles";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_profiles_id_seq;

-- Table Definition
CREATE TABLE "public"."user_profiles" (
    "id" int4 NOT NULL DEFAULT nextval('user_profiles_id_seq'::regclass),
    "user_id" int4,
    "profile_id" int4,
    "createdAt" timestamp,
    "updatedAt" timestamp,
    "deletedAt" timestamp,
    "role" varchar(20),
    PRIMARY KEY ("id")
);

-- Column Comments
COMMENT ON COLUMN "public"."user_profiles"."role" IS 'admin/member';

DROP TABLE IF EXISTS "public"."user_teams";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_departments_id_seq;

-- Table Definition
CREATE TABLE "public"."user_teams" (
    "id" int4 NOT NULL DEFAULT nextval('user_departments_id_seq'::regclass),
    "user_id" int4,
    "team_id" int4,
    "created_at" timestamp,
    "updated_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "email" varchar(50),
    "name" varchar(150),
    "avatar" varchar(150),
    "created_at" timestamp,
    "updated_at" timestamp,
    "password" varchar(255),
    "is_admin" bool DEFAULT false,
    "is_active" bool DEFAULT true,
    "fb_token_web" varchar(255),
    PRIMARY KEY ("id")
);

CREATE OR REPLACE FUNCTION public.uuid_generate_v1()
 RETURNS uuid
 LANGUAGE c
 STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v1mc()
 RETURNS uuid
 LANGUAGE c
 STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v1mc$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v3(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v3$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$
;

CREATE OR REPLACE FUNCTION public.uuid_generate_v5(namespace uuid, name text)
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v5$function$
;

CREATE OR REPLACE FUNCTION public.uuid_nil()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_nil$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_dns()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_dns$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_oid()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_oid$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_url()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_url$function$
;

CREATE OR REPLACE FUNCTION public.uuid_ns_x500()
 RETURNS uuid
 LANGUAGE c
 IMMUTABLE STRICT
AS '$libdir/uuid-ossp', $function$uuid_ns_x500$function$
;




























































