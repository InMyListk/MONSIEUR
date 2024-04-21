import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import React from "react";

type Props = {
  name: string;
  length: string;
  active: boolean;
};

export const LessonItem = ({ name, length, active }: Props) => {
  return (
    <div
      className={cn(
        "h-[60px] w-full bg-white rounded-xl flex flex-row-reverse items-center px-3  cursor-pointer",
        active
          ? "bg-purple-700 hover:bg-purple-700/80"
          : "bg-white hover:bg-gray-500/15"
      )}
    >
      <div className="p-2 bg-white rounded-full">
        {active ? (
          <Pause className="text-purple-500" />
        ) : (
          <Play className="text-purple-500" />
        )}
      </div>
      <div className="pr-3 flex flex-col items-end ">
        <h2
          className={cn(
            "line-clamp-1 text-sm font-medium",
            active ? "text-white" : "text-black"
          )}
        >
          {name}
        </h2>
        <p
          className={cn(
            "text-[12px]  font-semibold",
            active ? "text-white/70" : "text-gray-500/80"
          )}
        >
          {length}
        </p>
      </div>
    </div>
  );
};
