import * as React from "react";

const DropdownMenu = ({ items }) => (
  <div className="relative inline-block text-left">
    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        {items.map((item, i) => (
          <button key={i} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={item.onClick}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export { DropdownMenu };
