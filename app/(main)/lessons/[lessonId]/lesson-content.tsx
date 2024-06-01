import { lessons } from "@/db/schema";
import React from "react";
import { VideoContainer } from "./video-container";

type Props = {
  title: string;
  videoUrl?: string;
  description?: string;
  lesson?: typeof lessons.$inferSelect;
};

export const LessonContent = ({ title, videoUrl, description }: Props) => {
  return (
    <div className="mt-5 w-full flex flex-col items-end text-end">
      <div>
        <h1 className="lg:text-2xl text-lg font-semibold">{title}</h1>
      </div>
      <div className="w-full relative pt-[56.25%] mt-5">
        <VideoContainer />
      </div>
      <div className="mt-3 font-semibold text-sm text-muted-foreground">
        <p>{description}</p>
      </div>
    </div>
  );
};
