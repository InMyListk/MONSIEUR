import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
  activeLessonId: any;
};
const layout = async ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden xl:flex" />
      <main className="xl:pr-[260px] bg-gray-100 min-h-full max-h-fit pt-[50px]">
        <div className="w-full mx-auto h-full pt-8 pb-8">{children}</div>
      </main>
    </>
  );
};

export default layout;
