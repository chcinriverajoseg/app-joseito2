
// src/pages/Perfil.jsx
import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import Navbar from "@/ui/Navbar";

export default function Perfil() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/me");
        setProfile(data);
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {profile ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img
              src={profile.avatar || "https://i.pravatar.cc/150"}
              alt={profile.name}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {profile.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
            <p className="mt-3 text-gray-700 dark:text-gray-200">{profile.bio}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Edad: {profile.age || "—"}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Cargando perfil...</p>
        )}
      </div>
    </div>
  );
}

