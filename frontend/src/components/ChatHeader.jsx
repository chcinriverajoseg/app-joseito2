// src/components/ChatHeader.jsx
import React from "react";

export default function ChatHeader({ match }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-b">
      <img
        src={match?.photo || match?.avatar || "https://via.placeholder.com/48"}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold text-gray-800 dark:text-white">{match?.name || "Usuario"}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300">
          {match?.online ? "En línea" : match?.lastSeen ? `Visto ${new Date(match.lastSeen).toLocaleString()}` : "Última vez desconocida"}
        </div>
      </div>
    </div>
  );
}
