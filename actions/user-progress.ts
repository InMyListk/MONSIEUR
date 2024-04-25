import db from "@/db/drizzle";
import { getDegreeById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (degreeId: number) => {
  const { userId } = auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const degree = await getDegreeById(degreeId);
  if (!degree) {
    throw new Error("degree not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeDegreeId: degreeId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl,
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
    userImageSrc: user.imageUrl,
  });

  revalidatePath("/degrees");
  revalidatePath("/units");
  revalidatePath("/lessons");
  redirect("/units");
};
