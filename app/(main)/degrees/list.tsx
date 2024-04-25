"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { degrees, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";

import { Card } from "./card";

type Props = {
  degrees: (typeof degrees.$inferSelect)[];
  activeDegreeId?: typeof userProgress.$inferSelect.activeDegreeId;
};

export const List = ({ degrees, activeDegreeId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeDegreeId) {
      return router.push("/units");
    }

    startTransition(() => {
      upsertUserProgress(id).catch((error) => {
        toast.error("Something went wrong.");
      });
    });
  };

  return (
    <div className="lg:py-10 px-10 flex flex-row-reverse gap-3 flex-wrap md:justify-start justify-center">
      {degrees.map((degree) => (
        <Card
          key={degree.id}
          title={degree.title}
          active={degree.id === activeDegreeId}
          onClick={onClick}
          id={degree.id}
          disabled={pending}
        />
      ))}
    </div>
  );
};
