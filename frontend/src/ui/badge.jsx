import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = ({ children, className }) => {
  return (
    <span className={cn("inline-block px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground", className)}>
      {children}
    </span>
  );
};

export { Badge };
