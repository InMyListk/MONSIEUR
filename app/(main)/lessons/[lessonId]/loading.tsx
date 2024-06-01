import { Loader } from "lucide-react";

import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loading;
