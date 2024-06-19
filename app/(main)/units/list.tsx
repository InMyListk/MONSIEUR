"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { UnitCard } from "./card";
import {
  challenges,
  lessonProgress,
  lessons,
  units,
  userProgress,
} from "@/db/schema";
import { upsertUserProgressUnit } from "@/actions/user-progress";

type Props = {
  units: (typeof units.$inferSelect & {
    lessons: (typeof lessons.$inferSelect)[];
    lessonProgress: (typeof lessonProgress.$inferSelect)[];
    percentage: number;
    challenges: (typeof challenges.$inferSelect)[];
  })[];
  activeUnitId?: typeof userProgress.$inferSelect.activeUnitId;
  activeLessonId: any;
};

export const List = ({ units, activeUnitId, activeLessonId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeUnitId) {
      return router.push(`/lessons/${activeLessonId}`);
    }

    startTransition(() => {
      upsertUserProgressUnit(id).catch(() => {
        toast.error("Something went wrong.");
      });
    });
  };
  return (
    <div className="lg:py-10 px-10 flex flex-row-reverse gap-3 flex-wrap md:justify-start justify-center">
      {units.map((unit, index) => (
        <UnitCard
          key={unit.id}
          id={unit.id}
          title={unit.title}
          disabled={unit.id === activeUnitId}
          order={unit.order}
          description={unit.description}
          percentage={unit.percentage}
          lessons={unit.lessons}
          term={unit.term}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
