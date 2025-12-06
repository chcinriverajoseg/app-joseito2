import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

export default function MatchesPage() {
  const { token } = useUserContext();
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data);
      } catch {
        setMatches([]);
      }
    };

    load();
  }, [token]);

  const goToChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Tus matches 💘</h1>

      {matches.length === 0 && <p className="text-center">No tienes matches aún</p>}

      <div className="space-y-4">
        {matches.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-white dark:bg-gray-900 shadow rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            <button
              onClick={() => goToChat(user._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 transition"
            >
              💬 Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
