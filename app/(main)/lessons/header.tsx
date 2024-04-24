import { MobileLessonsSidebar } from "@/components/mobile-lessons-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="sticky top-0 flex flex-row-reverse justify-between items-center pt-3 pb-3">
      <div className="sm:block hidden">
        <Breadcrumb>
          <BreadcrumbList className="flex flex-row-reverse">
            <BreadcrumbItem className="cursor-pointer font-semibold">
              <Link href="/degrees" className="hover:text-black">
                الصف الاول الثانوي
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rotate-180" />
            <BreadcrumbItem className="cursor-pointer font-semibold">
              <Link href="/units" className="hover:text-black">
                الوحدة الاولي
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="rotate-180" />
            <BreadcrumbItem className="cursor-pointer font-semibold">
              <Link href="/lessons" className="hover:text-black">
                مقدمة الوحدة
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
