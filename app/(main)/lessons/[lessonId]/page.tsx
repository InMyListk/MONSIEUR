import { redirect } from "next/navigation";
import {
  getLesson,
  getNextLesson,
  getUnitPercentage,
  getUserProgress,
} from "@/db/queries";
import { Header } from "./header";
import { CompleteButton } from "./complete-button";
import { LessonContent } from "./lesson-content";

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: Props) => {
  const lessonId = params.lessonId;
  const userProgressData = getUserProgress();
  const unitPercentageData = getUnitPercentage();
  const lessonData = getLesson(params.lessonId);

  const [lesson, userProgress, unitPercentage] = await Promise.all([
    lessonData,
    userProgressData,
    unitPercentageData,
  ]);

  if (lesson?.unitId != userProgress?.activeUnitId) {
    redirect("/units");
  }

  if (!lesson) {
    return null;
  }
  const nextLessonId = await getNextLesson(lesson.order);

  return (
    <div>
      <Header
        degreeTitle={lesson.unit.degree?.title}
        unitTitle={lesson.unit.title}
        lessonTitle={lesson.title}
      />

      <LessonContent
        title={lesson.title}
        videoUrl={lesson.url}
        description={lesson.description}
        sections={lesson.lessonSections}
      />
      <div className="flex justify-end mt-20">
        <CompleteButton
          lessonId={lessonId}
          lessonOrder={lesson.order}
          nextLessonId={Number(nextLessonId)}
          unitPercentage={unitPercentage}
        />
      </div>
    </div>
  );
};
export default LessonIdPage;
