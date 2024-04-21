import React from "react";
import { LessonItem } from "./lesson-item";

export const LessonsSidebar = () => {
  return (
    <div className="h-fit w-full space-y-5">
      <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={true} />
      <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
      <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
      <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
      <LessonItem name="مقدمة الوحدة" length="20 دقيقة" active={false} />
    </div>
  );
};
