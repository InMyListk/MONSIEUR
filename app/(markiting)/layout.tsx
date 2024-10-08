import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col  items-center">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
