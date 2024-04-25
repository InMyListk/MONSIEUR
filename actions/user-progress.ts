"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getDegreeById, getUserProgress } from "@/db/queries";

export const upsertUserProgress = async (degreeId: number) => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized ");
  }

  const degree = await getDegreeById(degreeId);

  if (!degree) {
    throw new Error("Degree not found");
  }

  //   if (!degree.units.length || !degree.units[0].lessons.length) {
  //     throw new Error("Degree not empty");
  //   }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeDegreeId: degreeId,
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
    activeDegreeId: degreeId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/degrees");
  revalidatePath("/units");
  revalidatePath("/lessons");
  redirect("/units");
};
