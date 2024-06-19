import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignInButton,
  SignedOut,
  UserButton,
  auth,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader, Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { redirect } from "next/navigation";

export const MobileSidebar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }
  return (
    <>
      <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton />
      </ClerkLoaded>
      <div className="xl:hidden block">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-black" />
          </SheetTrigger>
          <SheetContent className="p-0 z-[100] max-w-[300px]">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
