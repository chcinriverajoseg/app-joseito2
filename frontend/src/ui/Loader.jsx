import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-6 h-6 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
