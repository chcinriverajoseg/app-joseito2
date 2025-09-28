import * as React from "react";

const Tabs = ({ tabs, selected, onSelect }) => (
  <div className="flex space-x-4 border-b mb-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onSelect(tab)}
        className={`pb-2 ${selected === tab ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export { Tabs };
