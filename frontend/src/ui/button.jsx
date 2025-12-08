import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium shadow 
        bg-pink-600 text-white hover:bg-pink-700 
        disabled:opacity-50 disabled:cursor-not-allowed 
        transition ${className}`}
    >
      {children}
    </button>
  );
}
