import { lessonSections } from "@/db/schema";
import React from "react";

type Props = {
  id: number;

  content: string;
};

export const Section = ({ id, content }: Props) => {
  return (
    <div className="space-y-5">
      <p className="font-medium sm:text-md text-sm mt-5">{content}</p>
    </div>
  );
};
