import React from "react";
import { LessonItem } from "./lesson-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getLessons } from "@/db/queries";

type Props = {
  className?: string;
};

export const LessonsSidebar = async ({ className }: Props) => {
  const lessonsData = getLessons();
  const [lessons] = await Promise.all([lessonsData]);

  return (
    <ScrollArea>
      <div className={cn("h-fit w-full space-y-5 pb-1", className)}>
        {lessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            completed={lesson.completed}
            length="20 دقيقة"
            active={false}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
