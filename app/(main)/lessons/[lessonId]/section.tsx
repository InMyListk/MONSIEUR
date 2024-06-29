import React from "react";

type Props = {
  id: number;
  title?: string;
  content: string;
};

export const Section = ({ id, title, content }: Props) => {
  return (
    <div className="space-y-5">
      {title && (
        <h3 className="sm:text-2xl text-xl font-semibold mt-10">{title}</h3>
      )}
      <p className="font-medium sm:text-md text-sm mt-5">{content}</p>
    </div>
  );
};
