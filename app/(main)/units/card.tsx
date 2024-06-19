import { BookOpen } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { lessons } from "@/db/schema";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type Props = {
  id: number;
  title: string;
  order: number;
  description: string;
  percentage: number;
  lessons: (typeof lessons.$inferSelect)[];
  term: string;
  disabled?: boolean;
  onClick: (id: number) => void;
};

export const UnitCard = ({
  id,
  title,
  disabled,
  order,
  description,
  percentage,
  lessons,
  onClick,
}: Props) => {
  return (
    <Card
      className={cn(
        "min-w-[230px] min-h-[305px] flex flex-col items-end cursor-pointer hover:border-purple-500 duration-300"
      )}
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="w-full">
        <Image
          className="w-full h-[150px] rounded-t-md"
          width={300}
          height={300}
          src="/jungle.jpg"
          blurDataURL="/jungle.jpg"
          placeholder="blur"
          alt=""
        />
      </div>
      <div className="p-4 w-full flex flex-col items-end gap-y-3">
        <h3 className="font-semibold text-right">{title}</h3>
        <div>
          <Badge
            variant={"default"}
            className="flex flex-row-reverse gap-x-2 items-center w-[130px] rounded-md"
          >
            <BookOpen size={17} className="text-purple-600" />
            <p className="text-purple-600 flex flex-row-reverse gap-x-1">
              <span>{lessons.length}</span> درس
            </p>
          </Badge>
        </div>
        <div className="w-full">
          {percentage != null && (
            <>
              <Progress value={percentage} className="w-full h-3 rotate-180" />
              <div className="flex font-medium text-purple-500 justify-end mt-3 text-[13px] space-x-2">
                <p>{percentage}%</p>
                <p>اكمل</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
