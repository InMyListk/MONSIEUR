import { lessonSections } from "@/db/schema";
import { Section } from "./section";

type Props = {
  sections: (typeof lessonSections.$inferSelect)[];
};

export const List = ({ sections }: Props) => {
  return (
    <div className="flex flex-col justify-between">
      {sections.map((section) => (
        <div key={section.id}>
          <Section
            title={section.title!}
            content={section.content}
            id={section.id}
          />
        </div>
      ))}
    </div>
  );
};
