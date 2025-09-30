/*import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 fade-in">
      {/* Hero Title *//*}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-600 dark:text-pink-400 drop-shadow-lg">
        Bienvenido a ❤️ Joseito
      </h1>

      {/* Subtítulo *//*}
      <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        Conecta, haz matches y encuentra nuevas experiencias.  
        Una app de citas moderna hecha con React, Vite y Tailwind.
      </p>

      {/* Botón CTA *//*}
      <div className="mt-8 flex gap-4">
        <Link
          to="/explore"
          className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold text-lg shadow hover:bg-pink-700 transition"
        >
          Explorar
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 rounded-xl border border-pink-600 text-pink-600 dark:text-pink-400 font-semibold text-lg hover:bg-pink-50 dark:hover:bg-gray-800 transition"
        >
          Registrarse
        </Link>
      </div>

      {/* Imagen / Ilustración *//*}
      <div className="mt-12">
        <img
          src="https://illustrations.popsy.co/gray/online-dating.svg"
          alt="Dating illustration"
          className="max-w-md w-full"
        />
      </div>
    </section>
  );
}*/
// src/pages/Home.jsx
import React from "react";
import Navbar from "@/ui/Navbar";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Avatar grande si está logueado */}
        {user && (
          <img
            src={user.avatar || "https://i.pravatar.cc/200"}
            alt={user.name}
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-pink-500 shadow-lg"
          />
        )}

        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          ❤️ Bienvenido a <span className="text-pink-600">App Joseito</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Conecta, haz matches y comienza nuevas conversaciones.  
          ¡El lugar perfecto para conocer gente nueva!
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/explore"
            className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 shadow-md"
          >
            🚀 Explorar
          </a>
          <a
            href="/matches"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-md"
          >
            💖 Matches
          </a>
        </div>
      </div>
    </div>
  );
}
