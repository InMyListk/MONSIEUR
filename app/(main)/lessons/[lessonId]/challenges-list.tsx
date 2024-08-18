import { challengeOptions, challenges } from "@/db/schema";
import React from "react";
import { Challenge } from "./challenge";
import { Button } from "@/components/ui/button";

type Props = {
  challenges: (typeof challenges.$inferSelect & {
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
    completed: boolean;
  })[];
};

export const ChallengesList = ({ challenges }: Props) => {
  return (
    <div>
      {challenges.map((challenge) => (
        <>
          <Challenge
            question={challenge.question}
            type={challenge.type}
            order={challenge.order}
            options={challenge.challengeOptions}
            challengeId={challenge.id}
            completed={challenge.completed}
          />
        </>
      ))}
    </div>
  );
};
