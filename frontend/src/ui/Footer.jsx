// src/ui/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        {/* Logo o nombre */}
        <p className="font-semibold text-pink-600 dark:text-pink-400">
          ❤️ App Joseito
        </p>

        {/* Enlaces rápidos */}
        <div className="flex gap-4">
          <a href="/explore" className="hover:text-pink-600 dark:hover:text-pink-400">
            Explorar
          </a>
          <a href="/matches" className="hover:text-pink-600 dark:hover:text-pink-400">
            Matches
          </a>
          <a href="/perfil" className="hover:text-pink-600 dark:hover:text-pink-400">
            Perfil
          </a>
        </div>

        {/* Créditos */}
        <p className="text-xs">
          © {new Date().getFullYear()} Joseito.codes — Hecho con 💻 y ❤️
        </p>
      </div>
    </footer>
  );
}
