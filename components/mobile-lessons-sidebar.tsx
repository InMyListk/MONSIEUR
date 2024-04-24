import { BookOpenCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LessonsSidebar } from "./lessons-sidebar";
import { UserProgress } from "./user-progress";

export const MobileLessonsSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="p-0">
        <div className="block lg:hidden p-3 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-200/80 duration-200">
          <BookOpenCheck className="text-purple-500" />
        </div>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 z-[100] max-w-[350px] flex flex-col gap-y-10 pt-10"
      >
        <UserProgress />
        <LessonsSidebar className="px-6 pt-8 pb-8" />
      </SheetContent>
    </Sheet>
  );
};
