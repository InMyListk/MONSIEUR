import React from "react";

export const UserProgress = () => {
  return (
    <div className="w-full min-h-[100px] bg-white rounded-lg flex justify-end">
      <div className="pt-4 px-4 flex flex-col items-end w-full">
        <div className="flex flex-row-reverse">
          <h1 className="text-md font-semibold">تقدمك في الوحدة</h1>
          <p className="mr-2 font-semibold text-purple-500">4%</p>
        </div>
        <div className="mt-5 rounded-2xl w-full h-4 bg-purple-300" />
      </div>
    </div>
  );
};
