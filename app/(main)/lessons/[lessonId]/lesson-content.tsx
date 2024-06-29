import { lessonSections, lessons } from "@/db/schema";
import React from "react";
import { VideoContainer } from "./video-container";
import { List } from "./list";

type Props = {
  title: string;
  videoUrl?: string;
  description?: string;
  // lesson?: typeof lessons.$inferSelect;
  sections: (typeof lessonSections.$inferSelect)[];
};

export const LessonContent = ({
  title,
  videoUrl,
  description,
  sections,
}: Props) => {
  return (
    <div className="w-full flex flex-col items-end text-end">
      <div>
        <h1 className="lg:text-2xl text-lg font-semibold">{title}</h1>
      </div>
      <div className="w-full relative pt-[56.25%] mt-5">
        <VideoContainer url={videoUrl} />
      </div>
      <div className="mt-3 font-semibold text-sm text-muted-foreground">
        <p>{description}</p>
      </div>
      <div className="pt-10">
        <List sections={sections} />
      </div>
    </div>
  );
};
