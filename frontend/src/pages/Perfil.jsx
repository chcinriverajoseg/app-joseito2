/*// src/pages/Perfil.jsx
import React from "react";
import { useUser } from "@/context/UserContext";
import Navbar from "@/ui/Navbar";

export default function Perfil() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt={user.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-400"
        />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {user.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          {user.bio || "Sin biografía"}
        </p>
      </div>
    </div>
  );
}*/
import React, { useState, useEffect } from "react";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";

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

  if (!profile) return <div>Cargando perfil...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={profile.avatar || "https://i.pravatar.cc/100"}
            alt={profile.name}
            className="w-20 h-20 rounded-full border-4 border-pink-300"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-200 mb-3"><strong>Edad:</strong> {profile.age || "Sin especificar"}</p>
        <p className="text-gray-700 dark:text-gray-200 mb-3"><strong>Bio:</strong> {profile.bio || "Sin descripción"}</p>
      </div>
    </div>
  );
}

