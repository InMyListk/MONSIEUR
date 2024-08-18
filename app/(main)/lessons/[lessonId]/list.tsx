import { lessonSections, lessonTopics } from "@/db/schema";
import { Section } from "./section";
import { TopicList } from "./topic-list";

type Props = {
  topics: (typeof lessonTopics.$inferSelect & {
    lessonSections: (typeof lessonSections.$inferSelect)[];
  })[];
};

export const List = ({ topics }: Props) => {
  return (
    <div className="flex flex-col justify-between">
      {topics.map((topic) => (
        <div key={topic.id}>
          <TopicList
            title={topic.title!}
            sections={topic.lessonSections}
            id={topic.id}
          />
        </div>
      ))}
    </div>
  );
};
