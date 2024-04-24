import Image from "next/image";
import { Card } from "./card";
import { getDegrees, getUserProgress } from "@/db/queries";

const DegreesPage = () => {
  const degreesData = getDegrees();
  const userProgressData = getUserProgress();

  // const [degrees, userProgress] = Promise.all([degreesData, userProgressData]); //to do

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
      {/* This should be in list components */}
      <div className="lg:py-10 px-10 flex flex-row-reverse gap-3 flex-wrap md:justify-start justify-center">
        <Card
          title="الصف الاول الثانوي"
          active={true}
          onClick={() => {}}
          id={1}
          disabled={false}
        />
        <Card
          title="الصف الثاني الثانوي"
          active={false}
          onClick={() => {}}
          id={1}
          disabled={false}
        />
        <Card
          title="الصف الثالث الثانوي"
          active={false}
          onClick={() => {}}
          id={1}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default DegreesPage;
