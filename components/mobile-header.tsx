import React from "react";
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <div className="fixed top-0 left-0 xl:pr-[260px] border-b h-[70px] w-full flex items-center justify-between px-6 z-50 bg-white">
      <MobileSidebar />
    </div>
  );
};
