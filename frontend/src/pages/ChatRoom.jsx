// src/pages/ChatRoom.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";
import { useUser } from "@/context/useUser";
import { useSocket } from "@/context/socketContext";

const PAGE = 30;

export default function ChatRoom() {
  const { chatId } = useParams();
  const { user } = useUser();
  const socket = useSocket();

  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isPeerTyping, setIsPeerTyping] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const bottomRef = useRef(null);
  const topSentinelRef = useRef(null);
  const typingTimeout = useRef(null);

  // Cargar cabecera y mensajes iniciales
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: chat } = await api.get(`/chats/${chatId}`);
        const { data: msgs } = await api.get(`/chats/${chatId}/messages?limit=${PAGE}`);
        if (!alive) return;
        setPeer(chat?.peer || null);
        setMessages(msgs || []);
        setHasMore((msgs || []).length === PAGE);
      } catch (e) {
        console.error(e);
        if (alive) setErr("No se pudo cargar el chat.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [chatId]);

  // Join/leave room + eventos socket
  useEffect(() => {
    if (!socket || !chatId) return;
    socket.emit("chat:join", chatId);

    const onNew = (msg) => {
      if (msg?.chat === chatId || msg?.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    const onTyping = ({ chatId: cid }) => { if (cid === chatId) setIsPeerTyping(true); };
    const onStop = ({ chatId: cid }) => { if (cid === chatId) setIsPeerTyping(false); };

    socket.on("message:new", onNew);
    socket.on("typing", onTyping);
    socket.on("stop_typing", onStop);

    return () => {
      socket.emit("chat:leave", chatId);
      socket.off("message:new", onNew);
      socket.off("typing", onTyping);
      socket.off("stop_typing", onStop);
    };
  }, [socket, chatId]);

  // Autoscroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Paginación hacia arriba
  useEffect(() => {
    if (!topSentinelRef.current || !hasMore) return;
    const el = topSentinelRef.current;
    const root = document.querySelector("#chat-scroll-root");

    const observer = new IntersectionObserver(async (entries) => {
      if (!entries[0].isIntersecting) return;
      if (messages.length === 0) return;
      try {
        const before = messages[0]?.createdAt;
        const { data: older } = await api.get(
          `/chats/${chatId}/messages?limit=${PAGE}&before=${encodeURIComponent(before)}`
        );
        if (!older || older.length === 0) {
          setHasMore(false);
          return;
        }
        setMessages((prev) => [...older, ...prev]);
      } catch (e) {
        console.error(e);
      }
    }, { root, threshold: 0 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [messages, chatId, hasMore]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const tempId = `tmp-${Date.now()}`;

    // Optimistic UI
    const optimistic = {
      _id: tempId,
      text,
      chat: chatId,
      author: { _id: user?._id },
      createdAt: new Date().toISOString(),
      pending: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setText("");

    try {
      const { data } = await api.post(`/chats/${chatId}/messages`, { text });
      setMessages((prev) => prev.map((m) => (m._id === tempId ? data : m)));
    } catch (e) {
      console.error(e);
      setMessages((prev) =>
        prev.map((m) => (m._id === tempId ? { ...m, pending: false, error: true } : m))
      );
    }
  };

  const onChangeText = (e) => {
    setText(e.target.value);
    if (!socket) return;
    socket.emit("typing", chatId);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => socket.emit("stop_typing", chatId), 800);
  };

  const isMine = (m) => m?.author?._id === user?._id;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto h-[calc(100vh-64px)] px-4 py-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b">
          <Link to="/chat" className="text-sm text-pink-600 hover:underline">
            ← Volver a chats
          </Link>
          <div className="flex items-center gap-3 ml-auto">
            <img
              src={peer?.avatar || "https://i.pravatar.cc/40"}
              className="w-9 h-9 rounded-full"
              alt={peer?.name || "Usuario"}
            />
            <div>
              <p className="font-medium">{peer?.name || peer?.username || "Usuario"}</p>
              <p className="text-xs text-gray-500">{isPeerTyping ? "Escribiendo…" : "En línea"}</p>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2" id="chat-scroll-root">
          <div ref={topSentinelRef} />
          {loading && (
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          )}

          {!loading && err && (
            <div className="p-3 rounded bg-red-100 text-red-700">{err}</div>
          )}

          {!loading && !err && messages.map((m) => (
            <div
              key={m._id}
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                isMine(m)
                  ? "ml-auto bg-pink-600 text-white"
                  : "mr-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              }`}
            >
              <p>{m.text}</p>
              <div className="text-[10px] opacity-70 mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
                {m.pending && " • Enviando…"}
                {m.error && " • Error"}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="mt-2 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={onChangeText}
            placeholder="Escribe un mensaje…"
            className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
