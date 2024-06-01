"use client";

import { lessonProgress } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleCheckBig, Pause, Play } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  id: number;
  title: string;
  length: string;
  active: boolean;
  completed: boolean;
};

export const LessonItem = ({ title, length, id, completed }: Props) => {
  const pathName = usePathname().slice(9);
  const active = pathName === String(id);
  return (
    <Link
      href={`/lessons/${id}`}
      className={cn(
        "h-[60px] w-full bg-white rounded-xl flex flex-row-reverse items-center justify-between px-3 cursor-pointer shadow-md",
        active
          ? "bg-purple-700 hover:bg-purple-700/80"
          : "bg-white hover:bg-gray-500/15"
      )}
    >
      <div className="flex flex-row-reverse items-center justify-between">
        <div className="p-2 bg-white rounded-full">
          {active ? (
            <Pause className="fill-purple-500 stroke-purple-500 text-purple-500" />
          ) : (
            <Play className="fill-purple-500 stroke-purple-500 text-purple-500" />
          )}
        </div>
        <div className="pr-3 flex flex-col items-end ">
          <h2
            className={cn(
              "line-clamp-1 text-sm font-medium",
              active ? "text-white" : "text-black"
            )}
          >
            {title}
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
      <div className="w-[50px]">
        {completed && <CircleCheckBig className="w-5 h-5 text-green-500" />}
      </div>
    </Link>
  );
};
