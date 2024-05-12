import { cache } from "react";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import {
  challengeProgress,
  degrees,
  lessons,
  units,
  userProgress,
} from "./schema";
import { tree } from "next/dist/build/templates/app-page";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeDegree: true,
      activeUnit: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeDegreeId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.degreeId, userProgress.activeDegreeId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => {
            progress.completed;
          })
        );
      });
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

export const getLessons = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeUnitId) {
    return [];
  }

  const data = await db.query.lessons.findMany({
    where: eq(lessons.unitId, userProgress.activeUnitId),
    with: {
      challenges: {
        with: {
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  const normalizedData = data.map((lesson) => {
    const allCompletedChallenges = lesson.challenges.every((challenge) => {
      return (
        challenge.challengeProgress &&
        challenge.challengeProgress.length > 0 &&
        challenge.challengeProgress.every((progress) => {
          progress.completed;
        })
      );
    });
    return { ...lesson, completed: allCompletedChallenges };
  });

  return normalizedData;
});

export const getDegrees = cache(async () => {
  const data = await db.query.degrees.findMany();

  return data;
});

export const getDegreeById = cache(async (degreeId: number) => {
  const data = await db.query.degrees.findFirst({
    where: eq(degrees.id, degreeId),
  });
  return data;
});

export const getUnitById = cache(async (unitId: number) => {
  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });
  return data;
});

export const getDegreeProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeDegreeId) {
    return null;
  }

  if (!userProgress.activeUnitId) {
    return null;
  }

  const unitsInActiveDegree = await db.query.units.findFirst({
    where: eq(units.id, userProgress.activeUnitId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveDegree?.lessons.find((lesson) => {
    return lesson.challenges.some((challenge) => {
      return (
        !challenge.challengeProgress ||
        challenge.challengeProgress.length === 0 ||
        challenge.challengeProgress.some(
          (progress) => progress.completed === false
        )
      );
    });
  });
  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  const courseProgress = await getDegreeProgress();

  if (!userId) {
    return null;
  }

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed };
  });
  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = async () => {
  const degreeProgress = await getDegreeProgress();

  if (!degreeProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(degreeProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
};
