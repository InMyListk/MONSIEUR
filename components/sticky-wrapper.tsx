type Props = {
  children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="hidden lg:block w-[300px] sticky self-end -bottom-6 ">
      <div className="min-h-[calc(100vh-60px)] sticky top-6 flex flex-col gap-y-10">
        {children}
      </div>
    </div>
  );
};
