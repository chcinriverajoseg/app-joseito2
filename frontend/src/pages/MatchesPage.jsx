import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import Button from "@/ui/Button";
import { useUserContext } from "@/context/UserContext";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const { onlineUsers } = useUserContext();

  useEffect(() => {
    const loadMatches = async () => {
      const res = await api.get("/api/users/matches");
      setMatches(res.data);
    };
    loadMatches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {matches.map((u) => (
        <div
          key={u._id}
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
        >
          <div className="relative w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-bold">
            {u.name[0].toUpperCase()}

            {onlineUsers.includes(u._id) && (
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full" />
            )}
          </div>

          <h2 className="mt-3 font-semibold">{u.name}</h2>

          <Button
            className="mt-4 w-full"
            onClick={() => navigate(`/chats/${u._id}`)}
          >
            💬 Chatear
          </Button>
        </div>
      ))}
    </div>
  );
}
