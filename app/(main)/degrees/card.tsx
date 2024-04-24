import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  id: number;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({ title, active, disabled, onClick }: Props) => {
  return (
    <div
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] sm:min-w-[200px] min-w-full"
      )}
    >
      <div className="min-h-[24px] w-full flex flex-center justify-start">
        {active && (
          <div className="rounded-md bg-green-600 flex justify-center items-center p-1.5">
            <Check className="w-4 h-4 stroke-[4] text-white" />
          </div>
        )}
      </div>

      <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
    </div>
  );
};
