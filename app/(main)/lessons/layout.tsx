import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { LessonsSidebar } from "@/components/lessons-sidebar";
import React from "react";
import { Header } from "./header";
import { getLessons, getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeUnit) {
    redirect("/units");
  }

  return (
    <div className="flex flex-row gap-[25px] px-6">
      <StickyWrapper>
        <UserProgress />
        <LessonsSidebar />
      </StickyWrapper>
      <FeedWrapper>
        <Header />
        {children}
      </FeedWrapper>
    </div>
  );
};

export default layout;
