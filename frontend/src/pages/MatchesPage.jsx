/*import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("/users/matches");
        setMatches(res.data);
      } catch (err) {
        console.error("Error cargando matches:", err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 fade-in">
      <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
        Tus Matches
      </h1>

      {matches.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Aún no tienes matches.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {matches.map((m) => (
            <div
              key={m._id}
              className="card flex items-center gap-4 hover:shadow-lg transition"
            >
              <img
                src={m.profileImage || "https://i.pravatar.cc/100"}
                alt={m.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {m.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {m.bio || "Sin bio"}
                </p>
              </div>
              <Link
                to={`/chat/${m._id}`}
                className="btn-primary flex items-center gap-2"
              >
                <MessageSquare size={18} />
                Chat
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}*/

import React, { useEffect, useState } from "react";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await api.get("/users/matches");
        setMatches(data || []);
      } catch (err) {
        console.error("Error cargando matches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
          Tus Matches
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Cargando matches...
          </p>
        ) : matches.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Aún no tienes matches. Dale ❤️ a más personas.
          </p>
        ) : (
          <div className="space-y-4">
            {matches.map((m) => (
              <div
                key={m._id}
                className="card flex items-center gap-4 p-4 hover:shadow-lg transition"
              >
                <img
                  src={m.profileImage || "https://i.pravatar.cc/100"}
                  alt={m.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold">{m.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {m.bio || "Sin biografía"}
                  </p>
                </div>
                <Link
                  to={`/chat/${m.chatId}`}
                  className="p-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
                >
                  <MessageSquare className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

