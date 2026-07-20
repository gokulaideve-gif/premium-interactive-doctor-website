import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 80 }).notNull(),
    displayName: varchar("display_name", { length: 120 }).notNull().default("Dr. Rudra"),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 30 }).notNull().default("admin"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("admin_users_username_unique").on(table.username)],
);

export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("admin_sessions_token_hash_unique").on(table.tokenHash),
    index("admin_sessions_user_id_idx").on(table.userId),
  ],
);

export const siteContent = pgTable(
  "site_content",
  {
    id: serial("id").primaryKey(),
    page: varchar("page", { length: 80 }).notNull().default("global"),
    key: varchar("key", { length: 180 }).notNull(),
    label: varchar("label", { length: 180 }).notNull(),
    value: text("value").notNull(),
    valueType: varchar("value_type", { length: 30 }).notNull().default("text"),
    groupName: varchar("group_name", { length: 80 }).notNull().default("General"),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedBy: integer("updated_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("site_content_page_key_unique").on(table.page, table.key),
    index("site_content_page_idx").on(table.page),
  ],
);

export const achievements = pgTable(
  "achievements",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 240 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 80 }).notNull(),
    achievementDate: date("achievement_date", { mode: "string" }).notNull(),
    imageUrl: text("image_url"),
    published: boolean("published").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdBy: integer("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("achievements_date_idx").on(table.achievementDate),
    index("achievements_published_idx").on(table.published),
  ],
);
