import { pgTable, integer, boolean, serial, uuid, varchar, text, timestamp, json } from "drizzle-orm/pg-core";

const USER_ROLES = [
  'user', 'admin', 'tech'
] as const;
export type UserRole = (typeof USER_ROLES)[number];

const TASK_STATUS = [
  'new', 'in Progress', 'canceled', 'done'
] as const;
export type TastStatus = (typeof TASK_STATUS)[number];

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  login: varchar('login', { length: 16 }).notNull().unique(),
  password: varchar('password', { length: 30 }).notNull(),
  status: boolean('status').default(true).notNull(),
  role: text('role', { enum: USER_ROLES })
    .default(USER_ROLES[0])
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const experts = pgTable('experts', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  cxId: varchar('cx_id', { length: 7 }).notNull(),
  status: boolean('status').default(true).notNull(),
  addedBy: integer('added_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  schedule: json('schedule').notNull(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull().unique(),
  createdBy: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  cxId: varchar('cx_id', { length: 7 }).notNull(),
  chatId: varchar('chat_id', { length: 15 }).notNull(),
  assignee: integer('assignee')
    .references(() => experts.id, { onDelete: 'cascade' }),
  deadline: timestamp('deadline').notNull(),
  status: text('status', { enum: TASK_STATUS })
    .default(TASK_STATUS[0])
    .notNull(),
  description: text('description'),
  startedAt: timestamp('started_at'),
  finishedAt: timestamp('finished_at'),
  metadata: json('metadata').notNull(),
});

export const expertStats = pgTable('expert_stats', {
  expertId: integer('expert_id')
    .primaryKey()
    .references(() => experts.id, { onDelete: 'cascade' }),
  wpm: integer('wpm').default(0).notNull(),
  tasksCompleted: integer('tasks_completed').default(0).notNull(),
  lastUpdate: timestamp('last_update').defaultNow().notNull(),
});