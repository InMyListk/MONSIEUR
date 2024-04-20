import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pr-[260px] h-full w-[] pt-[50px]">
        <div className="">{children}</div>
      </main>
    </>
  );
};

export default layout;
