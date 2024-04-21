import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { LessonsSidebar } from "@/components/lessons-sidebar";
import React from "react";

const LearningPage = () => {
  return (
    <div className="flex flex-row gap-[25px] px-6">
      <StickyWrapper>
        <UserProgress />
        <LessonsSidebar />
      </StickyWrapper>
      <FeedWrapper></FeedWrapper>
    </div>
  );
};

export default LearningPage;
