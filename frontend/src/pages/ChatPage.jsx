/*import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";
import Navbar from "@/ui/Navbar";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await api.get("/chats");
        setChats(data || []);
      } catch (err) {
        console.error("Error cargando chats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="max-w-4xl mx-auto flex-1 p-6 fade-in">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
          Mensajes
        </h1>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : chats.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Aún no tienes chats.
          </p>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => {
              const peer = chat.peer || {};
              return (
                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className="card flex items-center gap-4 hover:shadow-lg transition"
                >
                  <img
                    src={peer.avatar || "https://i.pravatar.cc/100"}
                    alt={peer.name || "Usuario"}
                    className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {peer.name || "Usuario"}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.lastMessage?.text || "Sin mensajes aún"}
                    </p>
                  </div>
                  <MessageSquare className="text-pink-500 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
  */
 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await api.get("/chats");
        setChats(data || []);
      } catch (err) {
        console.error("Error cargando chats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
          Mensajes
        </h1>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : chats.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No tienes chats aún. ¡Haz match para empezar a chatear!
          </p>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => {
              const peer = chat.peer || {};
              return (
                <Link
                  key={chat._id}
                  to={`/chat/${chat._id}`}
                  className="card flex items-center gap-4 p-4 hover:shadow-lg transition"
                >
                  <img
                    src={peer.avatar || "https://i.pravatar.cc/100"}
                    alt={peer.name || "Usuario"}
                    className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {peer.name || "Usuario"}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.lastMessage?.text || "Sin mensajes aún"}
                    </p>
                  </div>
                  <MessageSquare className="text-pink-500 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

