// src/pages/ChatRoom.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";
import { useUser } from "@/context/UserContext";

export default function ChatRoom() {
  const { chatId } = useParams();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // 📌 Cargar mensajes del chat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/chats/${chatId}/messages`);
        setMessages(data);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      }
    };
    fetchMessages();
  }, [chatId]);

  // 📌 Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📌 Enviar mensaje
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const { data } = await api.post(`/chats/${chatId}/messages`, { text });
      setMessages((prev) => [...prev, data]);
      setText("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Chat container */}
      <div className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hay mensajes todavía. ¡Empieza la conversación! 🚀
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.author._id === user._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                    msg.author._id === user._id
                      ? "bg-pink-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="block text-xs opacity-70 mt-1">
                    {msg.author.name}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Caja de texto */}
        <form
          onSubmit={handleSend}
          className="flex items-center mt-4 border-t border-gray-300 dark:border-gray-600 pt-4"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Enviar 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
