CREATE TABLE "expert_stats" (
	"expert_id" integer PRIMARY KEY NOT NULL,
	"wpm" integer DEFAULT 0 NOT NULL,
	"tasks_completed" integer DEFAULT 0 NOT NULL,
	"last_update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experts" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"cx_id" varchar(7) NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"added_by" integer NOT NULL,
	"schedule" json NOT NULL,
	CONSTRAINT "experts_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "assignee" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'new';--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "metadata" json NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "expert_stats" ADD CONSTRAINT "expert_stats_expert_id_experts_id_fk" FOREIGN KEY ("expert_id") REFERENCES "public"."experts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experts" ADD CONSTRAINT "experts_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_experts_id_fk" FOREIGN KEY ("assignee") REFERENCES "public"."experts"("id") ON DELETE cascade ON UPDATE no action;