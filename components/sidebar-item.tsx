import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  children: React.ReactNode;
};

export const SidebarItem = ({ label, href, children }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

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
