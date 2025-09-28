import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUser } from "@/context/UserContext";

const linkBase =
  "px-3 py-2 rounded-lg transition hover:bg-pink-100 hover:text-pink-700 dark:hover:bg-gray-800";

const isActiveClass = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? "text-pink-700 font-semibold dark:text-pink-400"
      : "text-gray-700 dark:text-gray-200"
  }`;

export default function Navbar() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-pink-600 dark:text-pink-400"
        >
          ❤️ Joseito
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={isActiveClass}>
            Inicio
          </NavLink>

          {user ? (
            <>
              <NavLink to="/explore" className={isActiveClass}>
                Explorar
              </NavLink>
              <NavLink to="/matches" className={isActiveClass}>
                Matches
              </NavLink>
              <NavLink to="/chat" className={isActiveClass}>
                Chat
              </NavLink>
              <NavLink to="/perfil" className={isActiveClass}>
                Perfil
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={isActiveClass}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" className={isActiveClass}>
                Registrarse
              </NavLink>
            </>
          )}
        </div>

        {/* Toggle mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {open ? (
            <X className="h-7 w-7 text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu className="h-7 w-7 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
          <NavLink to="/" onClick={() => setOpen(false)} className={isActiveClass}>
            Inicio
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/explore"
                onClick={() => setOpen(false)}
                className={isActiveClass}
              >
                Explorar
              </NavLink>
              <NavLink
                to="/matches"
                onClick={() => setOpen(false)}
                className={isActiveClass}
              >
                Matches
              </NavLink>
              <NavLink
                to="/chat"
                onClick={() => setOpen(false)}
                className={isActiveClass}
              >
                Chat
              </NavLink>
              <NavLink
                to="/perfil"
                onClick={() => setOpen(false)}
                className={isActiveClass}
              >
                Perfil
              </NavLink>
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={isActiveClass}
              >
                Iniciar sesión
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className={isActiveClass}
              >
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
