import { BookOpen } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { lessons } from "@/db/schema";
import { cn } from "@/lib/utils";

type Props = {
  id: number;
  title: string;
  order: number;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
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
  lessons,
  onClick,
}: Props) => {
  return (
    <Card
      className={cn(
        "min-w-[300px] min-h-[330px] flex flex-col items-end cursor-pointer hover:shadow-xl duration-300"
      )}
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="w-full">
        <Image
          className="w-full h-[180px] rounded-t-md"
          width={300}
          height={300}
          src="/jungle.jpg"
          blurDataURL="/jungle.jpg"
          placeholder="blur"
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-right">{title}</h3>
        <div className="mt-3">
          <Badge
            variant={"secondary"}
            className="flex flex-row-reverse gap-x-2 items-center w-[130px] rounded-md"
          >
            <BookOpen size={17} color="white" />
            <p className="text-white flex flex-row-reverse gap-x-1">
              <span>{lessons.length}</span> درس
            </p>
          </Badge>
        </div>
      </div>
    </Card>
  );
};
