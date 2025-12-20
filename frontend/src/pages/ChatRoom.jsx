import { useEffect, useState } from "react";
import socket from "@/socket";
import api from "@/api/axios";
import { useUserContext } from "@/context/UserContext";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const { roomId } = useParams();
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    api.get(`/messages/${roomId}`).then((res) => {
      setMessages(res.data);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const message = {
      roomId,
      sender: user._id,
      text,
    };

    socket.emit("sendMessage", message);
    setText("");
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-xs ${
              m.sender === user._id
                ? "bg-pink-500 text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-4 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
