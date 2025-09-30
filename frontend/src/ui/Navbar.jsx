/*// src/ui/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayUser = user?.user || user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo *//*}
        <Link
          to="/"
          className="text-2xl font-extrabold text-pink-600 dark:text-pink-400"
        >
          ❤️ Joseito
        </Link>

        {/* Links desktop *//*}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={isActiveClass}>
            Inicio
          </NavLink>

          {displayUser ? (
            <>
              <NavLink to="/explore" className={isActiveClass}>
                Explorar
              </NavLink>
              <NavLink to="/matches" className={isActiveClass}>
                Matches
              </NavLink>
              <NavLink to="/chat" className={isActiveClass}>
                Chats
              </NavLink>

              {/* Dropdown usuario *//*}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={
                      displayUser?.avatar ||
                      displayUser?.profileImage ||
                      "https://i.pravatar.cc/40"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-pink-300/60 object-cover"
                  />
                  <span className="hidden sm:inline text-gray-700 dark:text-gray-200">
                    {displayUser?.name || "Usuario"}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-semibold">{displayUser?.name}</p>
                      {displayUser?.email && (
                        <p className="text-xs truncate">{displayUser.email}</p>
                      )}
                    </div>
                    <NavLink
                      to="/perfil"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                      Editar perfil
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
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

        {/* Toggle mobile *//*}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {open ? (
            <svg
              className="h-7 w-7 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-7 w-7 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú mobile *//*}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
          <NavLink to="/" onClick={() => setOpen(false)} className={isActiveClass}>
            Inicio
          </NavLink>

          {displayUser ? (
            <>
              <NavLink to="/explore" onClick={() => setOpen(false)} className={isActiveClass}>
                Explorar
              </NavLink>
              <NavLink to="/matches" onClick={() => setOpen(false)} className={isActiveClass}>
                Matches
              </NavLink>
              <NavLink to="/chat" onClick={() => setOpen(false)} className={isActiveClass}>
                Chats
              </NavLink>
              <NavLink to="/perfil" onClick={() => setOpen(false)} className={isActiveClass}>
                Perfil
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)} className={isActiveClass}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)} className={isActiveClass}>
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}*/


// src/ui/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayUser = user?.user || user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-pink-600 dark:text-pink-400"
        >
          ❤️ Joseito
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={isActiveClass}>
            Inicio
          </NavLink>

          {displayUser ? (
            <>
              <NavLink to="/explore" className={isActiveClass}>
                Explorar
              </NavLink>
              <NavLink to="/matches" className={isActiveClass}>
                Matches
              </NavLink>
              <NavLink to="/chat" className={isActiveClass}>
                Chats
              </NavLink>

              {/* Dropdown usuario con animación */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={
                      displayUser?.avatar ||
                      displayUser?.profileImage ||
                      "https://i.pravatar.cc/40"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-pink-300/60 object-cover"
                  />
                  <span className="hidden sm:inline text-gray-700 dark:text-gray-200">
                    {displayUser?.name || "Usuario"}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menú animado */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 origin-top-right ${
                    menuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-semibold">{displayUser?.name}</p>
                    {displayUser?.email && (
                      <p className="text-xs truncate">{displayUser.email}</p>
                    )}
                  </div>
                  <NavLink
                    to="/perfil"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    Editar perfil
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
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
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {open ? (
            <svg
              className="h-7 w-7 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-7 w-7 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
          <NavLink to="/" onClick={() => setOpen(false)} className={isActiveClass}>
            Inicio
          </NavLink>

          {displayUser ? (
            <>
              <NavLink to="/explore" onClick={() => setOpen(false)} className={isActiveClass}>
                Explorar
              </NavLink>
              <NavLink to="/matches" onClick={() => setOpen(false)} className={isActiveClass}>
                Matches
              </NavLink>
              <NavLink to="/chat" onClick={() => setOpen(false)} className={isActiveClass}>
                Chats
              </NavLink>
              <NavLink to="/perfil" onClick={() => setOpen(false)} className={isActiveClass}>
                Perfil
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)} className={isActiveClass}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)} className={isActiveClass}>
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
