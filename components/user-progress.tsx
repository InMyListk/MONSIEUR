import React from "react";
import { Progress } from "@/components/ui/progress";
import { getUnitPercentage } from "@/db/queries";

export const UserProgress = async () => {
  const unitPercentageData = getUnitPercentage();

  const [unitPercentage] = await Promise.all([unitPercentageData]);

  return (
    <div className="w-full min-h-[100px] bg-white rounded-lg flex justify-end">
      <div className="pt-4 px-4 flex flex-col justify-between items-end w-full">
        <div className="flex flex-row-reverse">
          <h1 className="text-md font-semibold">تقدمك في الوحدة</h1>
          <p className="mr-2 font-semibold text-purple-500">
            {unitPercentage}%
          </p>
        </div>
        <Progress value={unitPercentage} className="mb-5 rotate-180" />
      </div>
    </div>
  );
};
