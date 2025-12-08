import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useUserContext } from "@/context/UserContext";
import ChatRoom from "./ChatRoom";

export default function ChatPage() {
  const { user } = useUserContext();
  const [matches, setMatches] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get(`/users/matches/${user._id}`);
        setMatches(res.data.matches || []);
      } catch (err) {
        console.log("Error cargando matches", err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {/* Sidebar */}
      <div className="bg-white p-4 rounded-xl shadow h-full overflow-y-auto">
        <h2 className="font-bold mb-4">Matches</h2>

        {matches.length === 0 && <p>No tienes matches aún.</p>}

        {matches.map((m) => (
          <button
            key={m._id}
            className="block w-full text-left p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setSelectedChat(m._id)}
          >
            ❤️ {m.name}
          </button>
        ))}
      </div>

      {/* Chat right side (2 columns span) */}
      <div className="col-span-2 bg-gray-50 p-4 rounded-xl shadow h-full">
        {!selectedChat ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Selecciona un match para chatear
          </div>
        ) : (
          <ChatRoom roomId={selectedChat} />
        )}
      </div>
    </div>
  );
}
