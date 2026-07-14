CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"assignee" text,
	"deadline" timestamp NOT NULL,
	"status" text NOT NULL,
	"started_at" timestamp,
	"finished_at" timestamp
);
