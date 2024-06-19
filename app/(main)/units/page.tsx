import React from "react";
import { List } from "./list";
import { getUnits, getUserProgress, getDegreeProgress } from "@/db/queries";

import { redirect } from "next/navigation";

const UnitsPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const degreeProgressData = getDegreeProgress();

  const [userProgress, units, degreeProgress] = await Promise.all([
    userProgressData,
    unitsData,
    degreeProgressData,
  ]);

  if (!userProgress || !userProgress.activeDegreeId) {
    redirect("/degrees");
  }
  return (
    <>
      <List
        units={units}
        activeUnitId={userProgress.activeUnitId}
        activeLessonId={degreeProgress?.activeLessonId}
      />
    </>
  );
};

export default UnitsPage;
