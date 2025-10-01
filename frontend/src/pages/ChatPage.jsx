// src/pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import Navbar from "@/ui/Navbar";

export default function ChatPage() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get("/chats");
      setChats(data);
    } catch (err) {
      console.error("❌ Error cargando chats:", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          💬 Tus chats
        </h1>

        {chats.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            No tienes chats todavía. Dale like a alguien para empezar 🚀
          </p>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => {
              // Usuario con el que estoy chateando (el otro, no yo)
              const localUser = JSON.parse(localStorage.getItem("user"))?.user;
              const otherUser = chat.users.find(
                (u) => u._id !== localUser?._id
              );

              return (
                <div
                  key={chat._id}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={otherUser?.avatar || "https://i.pravatar.cc/150"}
                      alt={otherUser?.name}
                      className="w-12 h-12 rounded-full border-2 border-pink-400 object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800 dark:text-white">
                        {otherUser?.name || "Usuario"}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Última actualización:{" "}
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/chat/${chat._id}`}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                  >
                    Abrir chat →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
