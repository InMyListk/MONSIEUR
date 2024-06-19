import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-16 w-full">
      <div className="w-full flex flex-row-reverse items-center gap-x-32 justify-center sm:px-0 px-2">
        <div className=" max-w-[400px] text-right">
          <div className="text-3xl font-bold">
            <h1 className="text-purple-500 underline">تعلم اللغة الفرنسية</h1>
            <h1>تعلم اللغة الفرنسية في اي وفت و في كل مكان</h1>
          </div>
          <p className="font-semibold text-sm text-muted-foreground mt-5">
            يمكنك تعلم اللغة الفرنسية بكل احترافية لكل الاغراض مع منصة{" "}
            <span>MONSIEUR</span>
          </p>
          <div className="mt-7 flex flex-row-reverse justify-start gap-x-4">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  afterSignInUrl="/degrees"
                  afterSignUpUrl="/degrees"
                >
                  <Button
                    variant={"secondary"}
                    size={"lg"}
                    className="w-[170px]"
                  >
                    ابدا التعلم
                  </Button>
                </SignUpButton>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/degrees"
                  afterSignUpUrl="/degrees"
                >
                  <Button
                    variant={"primaryOutline"}
                    size={"lg"}
                    className="w-[150px]"
                  >
                    لدي حساب بالفعل
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className="w-full text-lg font-semibold"
                  asChild
                >
                  <Link href="/degrees">اكمل تعلمك</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>

        <div>
          <Image
            src={"/booksAndPins.png"}
            width={300}
            height={300}
            alt="books"
          />
        </div>
      </div>
    </div>
  );
}
