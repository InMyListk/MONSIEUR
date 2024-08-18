import { lessonSections } from "@/db/schema";
import React from "react";
import { Section } from "./section";
type Props = {
  sections: (typeof lessonSections.$inferSelect)[];
};
export const SectionList = ({ sections }: Props) => {
  return (
    <div>
      {sections.map((section) => (
        <Section key={section.id} content={section.content} id={section.id} />
      ))}
    </div>
  );
};
