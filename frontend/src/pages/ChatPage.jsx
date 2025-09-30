// src/pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";

export default function ChatPage() {
  const [chats, setChats] = useState([]);

  // 📌 Cargar mis chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await api.get("/chats");
        setChats(data);
      } catch (err) {
        console.error("Error cargando chats:", err);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          💬 Mis Chats
        </h1>

        {chats.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Aún no tienes chats. ¡Haz match y empieza a conversar! 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {chats.map((chat) => {
              // Tomamos el otro usuario (distinto a mí)
              const other = chat.users?.find(
                (u) => u._id !== JSON.parse(localStorage.getItem("user"))?.user?._id
              );

              return (
                <div
                  key={chat._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={other?.avatar || "https://i.pravatar.cc/100"}
                      alt={other?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-pink-400"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {other?.name || "Usuario"}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {other?.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/chat/${chat._id}`}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                  >
                    Abrir chat
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
