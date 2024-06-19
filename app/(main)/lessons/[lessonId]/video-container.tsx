import React from "react";

type Props = {
  url?: string;
};

export const VideoContainer = ({ url }: Props) => {
  return (
    <iframe
      className="absolute inset-0 w-full h-full"
      style={{ width: "100%" }}
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
