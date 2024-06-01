"use client";

import { updateLessonCompletion } from "@/actions/lesson-progress";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useState, useTransition } from "react";
import { toast } from "sonner";
type Props = {
  lessonId: number;
  lessonOrder: number;
  nextLessonId: number;
  unitPercentage: number;
};

export const CompleteButton = ({
  lessonId,
  lessonOrder,
  nextLessonId,
  unitPercentage,
}: Props) => {
  const [percentage] = useState(unitPercentage);
  const [isFinshedUnit, setIsFinshedUnit] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = () => {
    if (pending) return;

    console.log(nextLessonId);

    startTransition(() => {
      updateLessonCompletion(Number(lessonId))
        .then(() => {
          nextLessonId ? router.push(`/lessons/${nextLessonId}`) : null;
        })
        .then(() => {
          if (
            (percentage === Math.round(100 - 100 / lessonOrder) ||
              percentage === 100) &&
            !nextLessonId
          ) {
            router.refresh();
            setIsFinshedUnit(true);
          }
        })

        .catch(() => {
          toast.error("Something went wrong.");
        });
    });
  };
  return (
    <>
      {isFinshedUnit && (
        <Confetti
          className="w-full h-full"
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
      )}
      <Button
        variant={"secondary"}
        size={"lg"}
        disabled={pending && true}
        onClick={onClick}
      >
        اكتمال الدرس
      </Button>
    </>
  );
};
