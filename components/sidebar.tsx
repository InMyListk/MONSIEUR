"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import {
  BadgeHelp,
  BookOpen,
  BookText,
  GraduationCap,
  Settings,
} from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "lg:w-[260px] border-l flex flex-col items-end h-full top-0 right-0 lg:fixed",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pb-7 right-0 pr-8">
          <Image src="/logo.png" height={110} width={110} alt="MONSIEUR" />
        </div>
      </Link>
      <div className="flex-1 flex flex-col mx-auto gap-y-2 pt-10 border-b">
        <SidebarItem label="الصفوف الدراسية" href="/learn">
          <GraduationCap />
        </SidebarItem>
        <SidebarItem label="الوحدات المقررة" href="/units">
          <BookText />
        </SidebarItem>
        <SidebarItem label="الدروس" href="/lessons">
          <BookOpen />
        </SidebarItem>
      </div>
      <div className="p-4 flex flex-col items-end mx-auto pb-20">
        <SidebarItem label="قسم الدعم" href="/help">
          <BadgeHelp />
        </SidebarItem>
        <SidebarItem label="الاعدادات" href="/settings">
          <Settings />
        </SidebarItem>
      </div>
    </div>
  );
};
