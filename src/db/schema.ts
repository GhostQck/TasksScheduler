import { pgTable, integer, serial, uuid, text, timestamp } from "drizzle-orm/pg-core";

const TASK_STATUS = [
  'New', 'In Progress', 'Canceled', 'Done'
] as const;

const EXPERTS = [
  'Expert-1', 'Expert-2', 'Expert-new'
] as const;

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  login: text('login').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  cxId: text('cx_id').notNull(),
  chatId: text('chat_id').notNull(),
  assignee: text('assignee', { enum: EXPERTS }),
  deadline: timestamp('deadline').notNull(),
  status: text('status', { enum: TASK_STATUS }).notNull(),
  description: text('description'),
  startedAt: timestamp('started_at'),
  finishedAt: timestamp('finished_at'),
});