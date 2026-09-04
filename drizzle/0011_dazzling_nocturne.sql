ALTER TABLE "shift_templates" ADD COLUMN "start_hour" smallint NOT NULL;--> statement-breakpoint
ALTER TABLE "shift_templates" ADD COLUMN "start_minute" smallint NOT NULL;--> statement-breakpoint
ALTER TABLE "shift_templates" ADD COLUMN "end_hour" smallint NOT NULL;--> statement-breakpoint
ALTER TABLE "shift_templates" ADD COLUMN "end_minute" smallint NOT NULL;--> statement-breakpoint
ALTER TABLE "shift_templates" DROP COLUMN "start_time";--> statement-breakpoint
ALTER TABLE "shift_templates" DROP COLUMN "end_time";