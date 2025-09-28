// src/ui/MatchModal.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function MatchModal({ open, onClose, peer, chatId }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl">
        <h2 className="text-2xl font-extrabold mb-2">¡Es un match! 🎉</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Tú y <strong>{peer?.name || "Usuario"}</strong> se agradan.
        </p>
        <img
          src={peer?.avatar || "https://i.pravatar.cc/120"}
          alt={peer?.name || "Usuario"}
          className="w-24 h-24 mx-auto rounded-full mb-6"
        />
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Seguir explorando
          </button>
          <Link
            to={`/chat/${chatId}`}
            className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
          >
            Ir al chat
          </Link>
        </div>
      </div>
    </div>
  );
}
