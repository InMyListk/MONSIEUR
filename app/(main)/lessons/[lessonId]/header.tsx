import { MobileLessonsSidebar } from "@/components/mobile-lessons-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type Props = {
  degreeTitle?: string;
  unitTitle?: string;
  lessonTitle?: string;
};

export const Header = ({ degreeTitle, unitTitle, lessonTitle }: Props) => {
  return (
    <div className="sticky top-0 flex flex-row-reverse justify-between items-center pt-3 pb-3">
      <div className="sm:block hidden">
        <Breadcrumb>
          <BreadcrumbList className="flex flex-row-reverse">
            <BreadcrumbItem className="cursor-pointer font-semibold">
              <Link href="/degrees" className="hover:text-black/80">
                {degreeTitle}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rotate-180" />
            <BreadcrumbItem className="cursor-pointer font-semibold">
              <Link href="/units" className="hover:text-black/80">
                {unitTitle}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rotate-180" />
            <BreadcrumbItem className="cursor-pointer font-semibold">
              <Link href="/lessons" className="hover:text-black/80">
                {lessonTitle}
              </Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div />
      <MobileLessonsSidebar />
    </div>
  );
};
