// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useUser } from "@/context/UserContext";
import Navbar from "@/ui/Navbar";

export default function ExplorePage() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users");
        setUsers(data.filter((u) => u._id !== user._id));
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };
    fetchUsers();
  }, [user]);

  const handleLike = async (id) => {
    try {
      await api.post(`/users/${id}/like`);
      alert("Like enviado ❤️");
    } catch (err) {
      console.error("Error al dar like:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 flex flex-col items-center text-center 
                       transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={u.avatar || "https://i.pravatar.cc/150"}
              alt={u.name}
              className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-pink-200 dark:border-pink-500"
            />
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {u.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {u.bio || "Sin biografía aún..."}
            </p>
            <button
              onClick={() => handleLike(u._id)}
              className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
            >
              ❤️ Like
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
