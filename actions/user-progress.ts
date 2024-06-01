"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { enrolledUnits, units, userProgress } from "@/db/schema";
import {
  getDegreeById,
  getDegreeProgress,
  getUnitById,
  getUserProgress,
} from "@/db/queries";
import { and, eq } from "drizzle-orm";

export const upsertUserProgressDegree = async (id: number) => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized ");
  }

  const degree = await getDegreeById(id);

  if (!degree) {
    throw new Error("Degree not found");
  }

  //   if (!degree.units.length || !degree.units[0].lessons.length) {
  //     throw new Error("Degree not empty");
  //   }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeDegreeId: id,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/degrees");
    revalidatePath("/units");
    revalidatePath("/lessons");
    redirect("/units");
  }

  await db.insert(userProgress).values({
    userId,
    activeDegreeId: id,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/degrees");
  revalidatePath("/units");
  revalidatePath("/lessons");
  redirect("/units");
};

export const upsertUserProgressUnit = async (id: number) => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized ");
  }

  const unit = await getUnitById(id);

  if (!unit) {
    throw new Error("Units not found");
  }

  //   if (!degree.units.length || !degree.units[0].lessons.length) {
  //     throw new Error("Degree not empty");
  //   }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    const existingEnrolledUnit = await db.query.enrolledUnits.findFirst({
      where: and(
        eq(enrolledUnits.userId, userId),
        eq(enrolledUnits.unitId, id)
      ),
    });

    const isEnrolled = !!existingEnrolledUnit;

    await db
      .update(userProgress)
      .set({
        activeUnitId: id,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      })
      .where(eq(userProgress.userId, userId));

    if (!isEnrolled) {
      await db.insert(enrolledUnits).values({
        userId,
        unitId: id,
      });
    }

    const degreeProgress = await getDegreeProgress();

    revalidatePath("/units");
    revalidatePath("/lessons");
    redirect(`/lessons/${degreeProgress?.activeLessonId}`);
  }

  await db.insert(userProgress).values({
    userId,
    activeUnitId: id,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  const degreeProgress = await getDegreeProgress();

  revalidatePath("/units");
  revalidatePath("/lessons");
  redirect(`/lessons/${degreeProgress?.activeLessonId}`);
};
