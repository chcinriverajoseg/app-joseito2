/*import React from "react";
import { useUser } from "@/context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Perfil() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600 dark:text-gray-300">
        Cargando perfil...
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 card text-center fade-in">
      <div className="flex justify-center">
        <img
          src={user.profileImage || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-500 shadow-md"
        />
      </div>

      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {user.name}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">{user.email}</p>

      {user.bio && (
        <p className="mt-4 text-gray-700 dark:text-gray-300 italic">
          "{user.bio}"
        </p>
      )}

      {user.age && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Edad: <span className="font-semibold">{user.age}</span>
        </p>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/perfil/editar"
          className="btn-primary text-center w-full sm:w-auto"
        >
          Editar Perfil
        </Link>
        <button
          onClick={handleLogout}
          className="btn-secondary text-center w-full sm:w-auto"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
*/

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import { useUser } from "@/context/UserContext";

export default function Perfil() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
          Mi Perfil
        </h1>

        {!user ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Cargando perfil...
          </p>
        ) : (
          <div className="card p-6 flex flex-col items-center text-center">
            <img
              src={
                user.profileImage ||
                user.avatar ||
                "https://i.pravatar.cc/150?img=12"
              }
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-pink-500 mb-4"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>

            {user.age && (
              <p className="mt-2">
                <strong>Edad:</strong> {user.age}
              </p>
            )}
            {user.bio && (
              <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-md">
                {user.bio}
              </p>
            )}

            <Link
              to="/perfil/editar"
              className="mt-6 px-6 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
            >
              Editar Perfil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
