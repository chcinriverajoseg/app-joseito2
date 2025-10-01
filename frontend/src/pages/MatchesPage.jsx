// src/pages/MatchesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import Navbar from "@/ui/Navbar";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  const fetchMatches = async () => {
    try {
      const { data } = await api.get("/users/matches");
      setMatches(data);
    } catch (err) {
      console.error("❌ Error cargando matches:", err);
    }
  };

  const handleStartChat = async (matchId) => {
    try {
      const { data } = await api.post("/chats", { userId: matchId });
      navigate(`/chat/${data._id}`); // redirige al chatRoom creado
    } catch (err) {
      console.error("❌ Error creando chat:", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          🔥 Tus Matches
        </h1>

        {matches.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Aún no tienes matches. ¡Explora y da algunos likes! ❤️
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <img
                  src={match.avatar || "https://i.pravatar.cc/150"}
                  alt={match.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 dark:border-pink-500 mb-3"
                />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  {match.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {match.bio || "Sin descripción aún..."}
                </p>
                <button
                  onClick={() => handleStartChat(match._id)}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                >
                  💬 Chatear
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
