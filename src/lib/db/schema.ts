import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const partnerApplications = sqliteTable("partner_applications", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  interest: text("interest").notNull(),
  handle: text("handle"),
  message: text("message").notNull(),
  status: text("status").notNull().default("neu"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  discord: text("discord"),
  telegram: text("telegram"),
  itemsJson: text("items_json").notNull(),
  totalCents: integer("total_cents").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export type PartnerApplication = typeof partnerApplications.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

export type PartnerStatus = "neu" | "in_bearbeitung" | "erledigt";
export type OrderStatus = "pending" | "fulfilled" | "cancelled";
