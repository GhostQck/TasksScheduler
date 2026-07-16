ALTER TABLE "tasks" ALTER COLUMN "cx_id" SET DATA TYPE varchar(7);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "chat_id" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "login" SET DATA TYPE varchar(16);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(30);