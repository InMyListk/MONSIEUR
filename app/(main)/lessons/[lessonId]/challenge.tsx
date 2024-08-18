"use client";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { challengeOptions } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  question: string;
  type: "ASSIST" | "SELECT";
  order: number;
  options: (typeof challengeOptions.$inferSelect)[];
  challengeId: number;
  completed: boolean;
};

export const Challenge = ({
  question,
  type,
  order,
  options,
  challengeId,
  completed,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const [pending, setTransition] = useTransition();

  const onContinue = async () => {
    if (!selectedOption) {
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      setTransition(() => {
        upsertChallengeProgress(challengeId)
          .then((response) => {
            setStatus("correct");
          })
          .catch(() => toast.error("Something went wrong, Please try again."));
      });
    } else {
      setStatus("wrong");
    }
  };

  return (
    <Card>
      <CardHeader>Question {order}</CardHeader>
      <CardContent>
        <CardTitle className="flex justify-between">
          {question}
          {completed && <CheckCircle className="text-green-500" />}
        </CardTitle>
        <div className="flex flex-col gap-y-5 mt-5">
          {options.map((option) => (
            <div
              className={cn(
                "h-full border-2 rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer active::border-b-2",
                selectedOption == option.id &&
                  "border-blue-300 bg-sky-100 hover:bg-blue-100",
                selectedOption == option.id &&
                  status === "correct" &&
                  "border-green-300 bg-green-100 hover:bg-green-100",
                selectedOption == option.id &&
                  status === "wrong" &&
                  "border-rose-300 bg-rose-100 hover:bg-rose-100",

                type === "ASSIST" && "lg:p-3 w-full"
              )}
              onClick={() => {
                setSelectedOption(option.id);
                setStatus("none");
              }}
            >
              {option.content}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            className="w-[120px] font-bold text-md"
            variant="primary"
            size="lg"
            onClick={onContinue}
          >
            {pending ? (
              <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : (
              "تاكيد"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
