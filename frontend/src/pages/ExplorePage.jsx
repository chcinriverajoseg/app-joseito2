/*import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { Heart, X } from "lucide-react";

export default function ExplorePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleLike = (id) => console.log("❤️ Like:", id);
  const handleSkip = (id) => console.log("❌ Skip:", id);

  return (
    <div className="max-w-6xl mx-auto p-6 fade-in">
      <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
        Explorar Perfiles
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No hay usuarios disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <div
              key={u._id}
              className="card group relative overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={u.profileImage || "https://i.pravatar.cc/300"}
                alt={u.name}
                className="w-full h-60 object-cover rounded-xl"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {u.name}, {u.age || "?"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                  {u.bio || "Sin descripción"}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-xl">
                <button
                  onClick={() => handleSkip(u._id)}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-red-500 shadow hover:scale-110 transition"
                >
                  <X size={28} />
                </button>
                <button
                  onClick={() => handleLike(u._id)}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-600 text-white shadow hover:scale-110 transition"
                >
                  <Heart size={28} />
                </button>
              </div>
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
import { Heart, XCircle } from "lucide-react";

export default function ExplorePage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await api.get("/users/explore");
        setProfiles(data || []);
      } catch (err) {
        console.error("Error cargando perfiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
          Explorar Perfiles
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Cargando perfiles...
          </p>
        ) : profiles.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No hay más perfiles disponibles.
          </p>
        ) : (
          <div className="space-y-6">
            {profiles.map((p) => (
              <div
                key={p._id}
                className="card flex flex-col items-center text-center p-6"
              >
                <img
                  src={p.profileImage || "https://i.pravatar.cc/150"}
                  alt={p.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-pink-500 mb-4"
                />
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {p.bio || "Sin biografía"}
                </p>
                <div className="flex gap-6">
                  <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <XCircle className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="p-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

