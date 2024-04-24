import React from "react";
import { LessonItem } from "./lesson-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const LessonsSidebar = ({ className }: Props) => {
  return (
    <ScrollArea>
      <div className={cn("h-fit w-full space-y-5 pb-1", className)}>
        <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={true} />
        <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
        <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
        <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
        <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
      </div>
    </ScrollArea>
  );
};
