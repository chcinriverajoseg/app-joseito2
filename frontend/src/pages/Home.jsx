// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/ui/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Navbar />
      <section className="flex flex-col flex-1 items-center justify-center text-center px-6 py-12">
        {/* Hero */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-600 dark:text-pink-400 drop-shadow-lg mb-6">
          ❤️ Bienvenido a App-Joseito
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
          Conoce gente nueva, haz matches y conversa al instante 🚀  
          Una app de citas moderna hecha con React, Vite y Tailwind.
        </p>

        {/* Botones CTA */}
        <div className="flex gap-4 mb-12">
          <Link
            to="/register"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 shadow transition"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 shadow transition"
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* Imagen ilustrativa */}
        <div>
          <img
            src="https://illustrations.popsy.co/gray/online-dating.svg"
            alt="Dating illustration"
            className="max-w-md w-full drop-shadow-lg"
          />
        </div>
      </section>
    </div>
  );
}

