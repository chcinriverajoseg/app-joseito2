// src/components/MessageBubble.jsx
import React from "react";
import classNames from "classnames";

export default function MessageBubble({ msg, isMe, showTick }) {
  const time = new Date(msg.createdAt || msg.createdAtAt || Date.now());
  const timeLabel = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={classNames("flex items-end gap-2", {
        "justify-end": isMe,
        "justify-start": !isMe,
      })}
    >
      {/* Avatar left when other */}
      {!isMe && (
        <img
          src={msg.avatar || msg.authorAvatar || "https://via.placeholder.com/36"}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      <div className="max-w-[72%]">
        {/* bubble */}
        <div
          className={classNames(
            "px-3 py-2 rounded-2xl break-words shadow-sm",
            {
              "bg-green-600 text-white rounded-br-none": isMe,
              "bg-white text-gray-800 dark:bg-gray-700 dark:text-white rounded-bl-none": !isMe,
            }
          )}
        >
          {msg.type === "image" ? (
            <img src={msg.url} className="w-48 h-auto rounded-md object-cover" alt="img" />
          ) : (
            <div className="whitespace-pre-wrap">{msg.text}</div>
          )}
        </div>

        {/* meta: time + ticks */}
        <div className={classNames("text-[11px] mt-1 flex items-center gap-2", {
          "justify-end": isMe,
          "justify-start": !isMe,
        })}>
          <span className={isMe ? "text-gray-200" : "text-gray-500 dark:text-gray-300"}>{timeLabel}</span>

          {isMe && (
            <span className={classNames("text-xs", { "text-blue-500": msg.read, "text-gray-400": !msg.read })}>
              ✓✓
            </span>
          )}
        </div>
      </div>

      {/* placeholder avatar right for my messages */}
      {isMe && <div className="w-8 h-8" />}
    </div>
  );
}
