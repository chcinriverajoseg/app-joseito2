// src/pages/ChatRoom.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import Navbar from "@/ui/Navbar";

export default function ChatRoom() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    try {
      const { data } = await api.get(`/chats/${chatId}/messages`);
      setMessages(data);
    } catch (err) {
      console.error("❌ Error cargando mensajes:", err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // evitar mensajes vacíos
    try {
      await api.post(`/chats/${chatId}/messages`, { text });
      setText("");
      fetchMessages();
    } catch (err) {
      console.error("❌ Error enviando mensaje:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Contenedor principal */}
      <div className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay mensajes aún. ¡Escribe el primero! 🚀
            </p>
          ) : (
            messages.map((msg) => {
              const currentUserId =
                JSON.parse(localStorage.getItem("user"))?.user?._id;
              const isMine = msg.author?._id === currentUserId;
              return (
                <div
                  key={msg._id}
                  className={`p-3 rounded-lg max-w-[70%] ${
                    isMine
                      ? "bg-pink-600 text-white self-end ml-auto"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start mr-auto"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Caja de texto + botón */}
        <form onSubmit={handleSend} className="flex gap-2">
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Escribe un mensaje..."
    className="flex-1 px-4 py-2 rounded-lg border focus:ring focus:outline-none"
  />
  <button
    type="submit"
    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
  >
    Enviar
  </button>
</form>

      </div>
    </div>
  );
}
