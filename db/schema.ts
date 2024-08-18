import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const degrees = pgTable("degrees", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src"),
});

export const degreesRelations = relations(degrees, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const unitsEnum = pgEnum("term", ["FIRST", "SECOND"]);

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  degreeId: integer("degree_id").references(() => degrees.id, {
    onDelete: "cascade",
  }),
  term: unitsEnum("term").notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
  degree: one(degrees, {
    fields: [units.degreeId],
    references: [degrees.id],
  }),
  userProgress: many(userProgress),
  lessons: many(lessons),
}));

export const enrolledUnits = pgTable("enrolled-unit", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  unitId: integer("unit_id").references(() => units.id, {
    onDelete: "cascade",
  }),
});

export const enrolledUnitsRelations = relations(enrolledUnits, ({ one }) => ({
  userProgress: one(userProgress, {
    fields: [enrolledUnits.userId],
    references: [userProgress.userId],
  }),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  lessonProgress: many(lessonProgress),
  lessonTopics: many(lessonTopics),

  challenges: many(challenges),
}));

export const lessonProgress = pgTable("lesson-progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id, {
    onDelete: "cascade",
  }),
  completed: boolean("completed").notNull().default(false),
});

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const lessonTopics = pgTable("lesson-topics", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title"),
  order: integer("order").notNull(),
});

export const lessonTopicsRelations = relations(
  lessonTopics,
  ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [lessonTopics.lessonId],
      references: [lessons.id],
    }),
    lessonSections: many(lessonSections),
  })
);

export const lessonSections = pgTable("lesson-section", {
  id: serial("id").primaryKey(),
  TopicId: integer("topic_id")
    .references(() => lessonTopics.id, {
      onDelete: "cascade",
    })
    .notNull(),

  imageUrl: text("image"),
  order: integer("order").notNull(),
  content: text("content").notNull(),
});

export const lessonSectionsRelations = relations(lessonSections, ({ one }) => ({
  lessonTopic: one(lessonTopics, {
    fields: [lessonSections.TopicId],
    references: [lessonTopics.id],
  }),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, {
    onDelete: "cascade",
  }),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id, {
    onDelete: "cascade",
  }),
  correct: boolean("correct").notNull(),
  content: text("content").notNull(),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id, {
    onDelete: "cascade",
  }),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("username").notNull().default("User"),
  userImageSrc: text("user_image_src"),
  activeDegreeId: integer("active_degree_id").references(() => degrees.id, {
    onDelete: "cascade",
  }),
  activeUnitId: integer("active_unit_id").references(() => units.id, {
    onDelete: "cascade",
  }),
});

export const userProgressRelation = relations(
  userProgress,
  ({ one, many }) => ({
    activeDegree: one(degrees, {
      fields: [userProgress.activeDegreeId],
      references: [degrees.id],
    }),
    activeUnit: one(units, {
      fields: [userProgress.activeUnitId],
      references: [units.id],
    }),
    enrolledUnits: many(enrolledUnits),
  })
);
