import * as React from "react";

const Tooltip = ({ message, children }) => (
  <div className="relative group">
    {children}
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 z-10">
      {message}
    </span>
  </div>
);

export { Tooltip };
