import { cache } from "react";
import { and, eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import {
  challengeProgress,
  degrees,
  lessonProgress,
  lessons,
  units,
  userProgress,
} from "./schema";

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
      enrolledUnits: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();
  const enrolledUnits = userProgress?.enrolledUnits;

  if (!userId || !userProgress?.activeDegreeId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.degreeId, userProgress.activeDegreeId),
    with: {
      lessons: {
        with: {
          lessonProgress: {
            where: eq(lessonProgress.userId, userId),
          },
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
    if (!data) {
      return 0;
    }
    const enrolledUnit = enrolledUnits?.some((enrolledUnit) => {
      return enrolledUnit.unitId === unit.id;
    });

    if (enrolledUnit) {
      const completedLessons = unit.lessons.filter((lesson) => {
        return (
          lesson.lessonProgress &&
          lesson.lessonProgress.length > 0 &&
          lesson.lessonProgress.every((progress) => progress.completed)
        );
      });

      const percentage = Math.round(
        (completedLessons.length / unit.lessons.length) * 100
      );
      const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
        if (lesson.challenges.length === 0) {
          return { ...lesson, completed: false };
        }

        return { ...lesson };
      });

      return {
        ...unit,
        lessons: lessonsWithCompletedStatus,
        percentage: percentage,
      };
    }
    return {
      ...unit,
      percentage: null,
    };
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
    orderBy: (lessons, { asc }) => [asc(lessons.order)],
    with: {
      lessonProgress: {
        where: eq(lessonProgress.userId, userId),
      },

      challenges: {
        with: {
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  const normalizedLessonsData = data.map((lesson) => {
    // const allCompletedChallenges = lesson.challenges.every((challenge) => {
    //   return (
    //     challenge.challengeProgress &&
    //     challenge.challengeProgress.length > 0 &&
    //     challenge.challengeProgress.every((progress) => {
    //       progress.completed;
    //     })
    //   );
    // });

    const completedLesson =
      lesson.lessonProgress &&
      lesson.lessonProgress.length > 0 &&
      lesson.lessonProgress.every((progress) => progress.completed);
    // if (lesson.challenges.length === 0) {
    //   return { ...lesson, completed: completedLesson };
    // }
    return { ...lesson, completed: completedLesson };
  });

  return normalizedLessonsData;
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

export const getUnitPercentage = async () => {
  const lessons = await getLessons();

  if (!lessons) {
    return 0;
  }

  const completedLessons = lessons.filter((lesson) => lesson.completed);

  const percentage = Math.round(
    (completedLessons.length / lessons.length) * 100
  );

  return percentage;
};

export const getDegreeProgress = cache(async (id?: number) => {
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
          lessonProgress: {
            where: eq(lessonProgress.userId, userId),
          },
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

  const firstUncompletedLesson =
    unitsInActiveDegree?.lessons.find((lesson) => {
      return (
        !lesson.lessonProgress ||
        lesson.lessonProgress.length === 0 ||
        lesson.lessonProgress.some((progress) => progress.completed === false)
      );
    }) || unitsInActiveDegree?.lessons[unitsInActiveDegree?.lessons.length - 1];

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id: number) => {
  const { userId } = await auth();
  const courseProgress = await getDegreeProgress(id);

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
      lessonProgress: {
        where: eq(lessonProgress.userId, userId),
      },
      unit: {
        with: {
          degree: true,
        },
      },
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

export const getNextLesson = async (lessonOrder: number) => {
  const { userId } = await auth();

  const userProgress = await getUserProgress();

  if (!userId || !userProgress) {
    return null;
  }

  if (!userProgress.activeUnitId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: and(
      eq(lessons.order, lessonOrder + 1),
      eq(lessons.unitId, userProgress.activeUnitId)
    ),
  });

  if (!data) {
    return null;
  }

  return data.id;
};

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
