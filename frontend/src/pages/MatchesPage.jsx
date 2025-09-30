// src/pages/MatchesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";
import { useUser } from "@/context/UserContext";

export default function MatchesPage() {
  const { user } = useUser();
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  // 📌 Obtener matches del usuario
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await api.get("/users/matches");
        setMatches(data);
      } catch (err) {
        console.error("Error cargando matches:", err);
      }
    };
    fetchMatches();
  }, []);

  // 📌 Crear chat con un match
  const handleStartChat = async (matchId) => {
    try {
      const { data } = await api.post("/chats", { userId: matchId });
      navigate(`/chat/${data._id}`);
    } catch (err) {
      console.error("Error al crear chat:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          ❤️ Mis Matches
        </h1>

        {matches.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Aún no tienes matches. ¡Sigue dando likes para encontrar uno! 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <img
                  src={match.avatar || "https://i.pravatar.cc/150"}
                  alt={match.name}
                  className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-pink-300 dark:border-pink-500"
                />
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {match.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {match.bio || "Sin descripción"}
                </p>
                <button
                  onClick={() => handleStartChat(match._id)}
                  className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
                >
                  💬 Iniciar chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
