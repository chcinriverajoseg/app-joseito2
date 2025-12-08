import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
