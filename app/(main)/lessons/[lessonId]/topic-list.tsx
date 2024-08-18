import { lessonSections } from "@/db/schema";
import React from "react";
import { SectionList } from "./section-list";

type Props = {
  id: number;
  title?: string;

  sections: (typeof lessonSections.$inferSelect)[];
};
export const TopicList = ({ id, title, sections }: Props) => {
  return (
    <div>
      <h3 className="sm:text-2xl text-xl font-semibold mt-10">{title}</h3>
      <SectionList sections={sections} />
    </div>
  );
};
