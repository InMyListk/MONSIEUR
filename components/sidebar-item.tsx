"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  activeHref?: string;
  children: React.ReactNode;
};

export const SidebarItem = ({ label, href, activeHref, children }: Props) => {
  const pathname = usePathname();
  const active =
    activeHref && pathname.includes(activeHref) ? true : pathname === href;

  return (
    <>
      {href ? (
        <Button
          variant={active ? "sidebarOutline" : "sidebar"}
          className="justify-end h-[40px] w-[220px] rounded-[10px]"
          asChild
        >
          <Link href={href} className="flex items-center space-x-3">
            <p className="font-bold">{label}</p>
            {children}
          </Link>
        </Button>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
