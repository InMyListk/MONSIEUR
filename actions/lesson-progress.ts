"use server";

import db from "@/db/drizzle";
import { lessonProgress, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { error } from "console";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateLessonCompletion = async (lessonId: number) => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized ");
  }

  if (!lessonId) {
    redirect("/units");
  }

  const existingLessonProgress = await db.query.lessonProgress.findFirst({
    where: and(
      eq(lessonProgress.userId, userId),
      eq(lessonProgress.lessonId, lessonId)
    ),
  });
  const isExist = !!existingLessonProgress;

  if (isExist) {
    await db
      .update(lessonProgress)
      .set({
        completed: true,
      })
      .where(eq(lessonProgress.id, existingLessonProgress.id));

    revalidatePath("/degrees");
    revalidatePath("/units");
    revalidatePath("/lessons");
    revalidatePath(`/lessons/${lessonId}`);
    return;
  }
  if (!isExist) {
    await db.insert(lessonProgress).values({
      userId,
      lessonId: lessonId,

      completed: true,
    });

    revalidatePath("/degrees");
    revalidatePath("/units");
    revalidatePath("/lessons");
    revalidatePath(`/lessons/${lessonId}`);
  }
};
