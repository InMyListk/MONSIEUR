import { cache } from "react";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { degrees, units, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeDegree: true,
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
  });

  return data;
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
