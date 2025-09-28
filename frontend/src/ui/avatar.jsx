import * as React from "react";
import { cn } from "@/lib/utils";

const Avatar = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-12 h-12 rounded-full object-cover", className)}
    />
  );
};

export { Avatar };
