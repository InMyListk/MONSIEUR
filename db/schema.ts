import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const degrees = pgTable("degrees", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src"),
});

export const degreesRelations = relations(degrees, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  username: text("username").notNull().default("User"),
  userImageSrc: text("user_image_src"),
  activeDegreeId: integer("active_degree_id").references(() => degrees.id, {
    onDelete: "cascade",
  }),
});

export const userProgressRelation = relations(userProgress, ({ one }) => ({
  activeDegree: one(degrees, {
    fields: [userProgress.activeDegreeId],
    references: [degrees.id],
  }),
}));
