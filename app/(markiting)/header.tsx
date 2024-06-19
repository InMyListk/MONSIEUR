import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import React from "react";

export const Header = () => {
  return (
    <header className="h-20 w-full px-4">
      <div className=" lg:max-w-screen-lg h-full m-auto flex justify-between items-center">
        <div className="pt-8 pl-4 pb-7 flex items-center h-full gap-x-3">
          <Image src="/logo.png" height={140} width={140} alt="logo" />
        </div>
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl="/learn"
              afterSignUpUrl="/learn"
            >
              <Button size={"lg"} variant={"ghost"}>
                تسجيل الدخول
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
