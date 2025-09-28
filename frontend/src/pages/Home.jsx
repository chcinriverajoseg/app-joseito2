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
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/ui/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        {/* Imagen central */}
        <img
          src="https://illustrations.popsy.co/violet/love-connection.svg"
          alt="Encuentra tu match"
          className="w-72 h-72 mb-8 drop-shadow-lg"
        />

        {/* Título y descripción */}
        <h1 className="text-4xl font-extrabold text-pink-600 dark:text-pink-400 mb-4">
          Bienvenido a ❤️ Joseito
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-8">
          Encuentra tu match perfecto, conéctate con personas increíbles y
          comienza nuevas conversaciones hoy mismo.
        </p>

        {/* Botones */}
        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
          >
            Comenzar ahora
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </main>
    </div>
  );
}

