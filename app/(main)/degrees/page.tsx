import Image from "next/image";
import { List } from "./list";
import { getDegrees, getUserProgress } from "@/db/queries";

const DegreesPage = async () => {
  const degreesData = getDegrees();
  const userProgressData = getUserProgress();

  const [degrees, userProgress] = await Promise.all([
    degreesData,
    userProgressData,
  ]); //to do

  return (
    <div className="flex flex-col w-full">
      <div className="w-full relative object-contain h-[300px] p-5">
        <div className="w-[calc(100%-40px)] rounded-xl h-[calc(100%-40px)] absolute bg-black/40 z-10" />
        <Image
          src="/studyVector.svg"
          className="w-full object-none h-full rounded-xl before:bg-black/10 "
          alt="study"
          width={0}
          height={0}
        />
      </div>
      <List degrees={degrees} activeDegreeId={userProgress?.activeDegreeId} />
    </div>
  );
};

export default DegreesPage;
