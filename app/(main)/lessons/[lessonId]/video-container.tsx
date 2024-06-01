import React from "react";

export const VideoContainer = () => {
  return (
    <iframe
      className="absolute inset-0 w-full h-full"
      style={{ width: "100%" }}
      src="https://www.youtube-nocookie.com/embed/dP75Khfy4s4?si=8UyMJf82R-9PoYr5"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
