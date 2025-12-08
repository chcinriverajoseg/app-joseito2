import React from "react";

const TextArea = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <textarea
        {...props}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        rows="4"
      ></textarea>
    </div>
  );
};

export default TextArea;
