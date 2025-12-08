import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 
      hover:shadow-xl transition ${className}`}
    >
      {children}
    </div>
  );
}
