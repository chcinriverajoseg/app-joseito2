import React from "react";

export default function Input({ label, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`px-3 py-2 rounded-lg border border-gray-300 
          focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
          dark:bg-gray-800 dark:border-gray-600 dark:text-white 
          transition ${className}`}
      />
    </div>
  );
}
