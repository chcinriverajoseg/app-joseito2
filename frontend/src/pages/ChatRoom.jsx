/*/ src/pages/ChatRoom.jsx
import React, { useEffect, useRef, useState } from "react";
import socket from "@/socket/socket"; // archivo global (ver abajo)
import api from "@/api/axios";
import { useUserContext } from "@/context/UserContext";
import MessageBubble from "@/components/MessageBubble";
import ChatHeader from "@/components/ChatHeader";

function groupByDay(messages = []) {
  const groups = [];
  messages.forEach((m) => {
    const date = new Date(m.createdAt || m.createdAtAt || Date.now());
    const key = date.toDateString();
    const g = groups.find((x) => x.key === key);
    if (g) g.messages.push(m);
    else groups.push({ key, label: formatDayLabel(date), messages: [m] });
  });
  groups.sort((a, b) => new Date(a.key) - new Date(b.key));
  return groups;
}

function formatDayLabel(d) {
  const today = new Date();
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Hoy";
  if (d.toDateString() === y.toDateString()) return "Ayer";
  return d.toLocaleDateString();
}

export default function ChatRoom({ roomId, match }) {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const fileRef = useRef(null);
  const containerRef = useRef(null);

  // cargar mensajes
  useEffect(() => {
    if (!roomId) return;
    (async () => {
      try {
        const res = await api.get(`/api/chat/${roomId}`);
        setMessages(res.data || []);
        // marcar leído al entrar (llamada REST que actualiza DB)
        await api.post("/api/chat/mark-read", { roomId });
        // emitir por socket mark-read
        socket.emit("mark_read", { roomId, userId: user._id });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [roomId]);

  // sockets
  useEffect(() => {
    if (!roomId) return;
    socket.emit("join_room", roomId);

    const onReceive = (msg) => {
      setMessages((prev) => {
        // evitar duplicados si ya existe _id
        if (prev.some((p) => p._id === msg._id || p.id === msg.id)) return prev;
        return [...prev, msg];
      });
      // si estoy en bottom auto-scroll
      const el = containerRef.current;
      if (el && el.scrollHeight - el.clientHeight - el.scrollTop < 150) {
        setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }), 50);
      }
    };

    const onTyping = ({ userId }) => {
      if (userId === user._id) return;
      setTyping(true);
      setTimeout(() => setTyping(false), 1200);
    };

    const onMarkRead = ({ roomId: r, userId }) => {
      if (r !== roomId) return;
      // actualizar mensajes como leídos si soy el autor opuesto
      setMessages((prev) => prev.map((m) => (m.author !== user._id ? { ...m, read: true } : m)));
    };

    socket.on("receive_message", onReceive);
    socket.on("typing", onTyping);
    socket.on("mark_read", onMarkRead);

    return () => {
      socket.off("receive_message", onReceive);
      socket.off("typing", onTyping);
      socket.off("mark_read", onMarkRead);
    };
  }, [roomId, user._id]);

  // enviar texto
  const sendText = async () => {
    if (!text.trim()) return;
    const payload = { roomId, text, type: "text", author: user._id, createdAt: new Date() };
    // POST al backend para persistir y obtener _id
    try {
      const res = await api.post("/api/chat/send", { roomId, text, type: "text" });
      const saved = res.data;
      socket.emit("send_message", saved); // emite guardado (con id producido)
      setMessages((prev) => [...prev, saved]);
      setText("");
    } catch (err) {
      console.error("send error", err);
    }
  };

  // upload imagen
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await api.post("/api/chat/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      // res.data.url -> use it
      const res2 = await api.post("/api/chat/send", { roomId, type: "image", url: res.data.url });
      socket.emit("send_message", res2.data);
      setMessages((p) => [...p, res2.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // typing
  let typingTimeout;
  const handleTyping = () => {
    socket.emit("typing", { roomId, userId: user._id });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit("stop_typing", { roomId, userId: user._id }), 1500);
  };

  const grouped = groupByDay(messages);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded">
      <ChatHeader match={{ ...match }} />

      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {grouped.map((g) => (
          <div key={g.key}>
            <div className="flex justify-center mb-3">
              <div className="px-3 py-1 rounded-full text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                {g.label}
              </div>
            </div>

            {g.messages.map((m) => (
              <MessageBubble key={m._id || m.id || Math.random()} msg={m} isMe={String(m.author) === String(user._id)} />
            ))}
          </div>
        ))}

        {typing && <div className="text-sm text-gray-500 italic">Escribiendo...</div>}
      </div>

      <div className="bg-white p-3 border-t flex items-center gap-2">
        <input ref={fileRef} type="file" id="file" className="hidden" onChange={handleFile} />
        <label htmlFor="file" className="px-2 py-1 bg-white border rounded cursor-pointer">📎</label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(); } }}
          onInput={handleTyping}
          rows={1}
          className="flex-1 resize-none rounded-2xl px-3 py-2 border focus:outline-none"
          placeholder="Escribe un mensaje..."
        />

        <button onClick={sendText} className="bg-green-600 text-white px-4 py-2 rounded-2xl">➤</button>
      </div>
    </div>
  );
} */

  import { useEffect, useState, useRef } from "react";
import { useUserContext } from "@/context/UserContext";
import api from "@/api/axios";

export default function ChatRoom({ roomId }) {
  const { user } = useUserContext();

  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);
  const [text, setText] = useState("");
  const fileInput = useRef(null);

  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages + online state
  useEffect(() => {
    loadChat();
    setOnline(true);

    return () => setOnline(false);
  }, [roomId]);

  async function loadChat() {
    try {
      const res = await api.get(`/chat/${roomId}`);
      setMessages(res.data);
    } catch (err) {
      console.log("Error loading chat", err);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      roomId,
      text,
      type: "text",
    };

    const res = await api.post("/chat/send", newMsg);
    setMessages([...messages, res.data]);
    setText("");
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const upload = await api.post("/chat/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const send = await api.post("/chat/send", {
      roomId,
      type: "image",
      url: upload.data.url,
    });

    setMessages([...messages, send.data]);
  }

  return (
    <div className="flex h-full w-full bg-gray-100">
      {/* CHAT WINDOW */}
      <div className="flex flex-col w-full h-full">

        {/* Header */}
        <div className="flex items-center px-4 py-3 bg-white shadow-sm border-b">
          <div className="flex flex-col">
            <span className="font-bold">{user?.name}</span>
            <span className="text-sm text-green-500">
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-chatbg">

          {messages.map((msg) => {
            const mine = msg.author === user._id;

            return (
              <div
                key={msg._id}
                className={`max-w-[70%] p-2 rounded-2xl shadow-sm text-sm 
                ${mine ? "bg-green-500 text-white ml-auto rounded-br-none" 
                      : "bg-white mr-auto rounded-bl-none"}
              `}
              >
                {msg.type === "text" && msg.text}
                {msg.type === "image" && (
                  <img
                    src={msg.url}
                    alt="img"
                    className="rounded-xl max-h-52"
                  />
                )}

                {/* read status */}
                {mine && (
                  <div className="text-xs flex justify-end mt-1">
                    {msg.read ? "✓✓" : "✓"}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="bg-white p-3 flex gap-2 items-center border-t"
        >
          <button
            type="button"
            onClick={() => fileInput.current.click()}
            className="p-2 bg-gray-200 rounded-full"
          >
            📎
          </button>

          <input
            ref={fileInput}
            type="file"
            className="hidden"
            onChange={handleUpload}
          />

          <input
            className="flex-1 p-2 bg-gray-100 rounded-full outline-none"
            placeholder="Escribe un mensaje"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-full"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}

