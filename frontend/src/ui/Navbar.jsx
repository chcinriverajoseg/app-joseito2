import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

export default function Navbar() {
  const { user, logoutUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 flex items-center justify-between px-6 py-4">
      
      {/* LOGO */}
      <Link to="/" className="text-3xl font-bold text-pink-600 tracking-tight">
        ❤️ Joseito
      </Link>

      {/* NAVEGACIÓN */}
      <div className="flex items-center gap-6 text-lg font-medium">

        {/* SI NO HAY USUARIO */}
        {!user && (
          <>
            <Link className="hover:text-pink-600" to="/login">
              Iniciar sesión
            </Link>
            <Link className="hover:text-pink-600" to="/register">
              Registrarse
            </Link>
          </>
        )}

        {/* SI ESTA LOGUEADO */}
        {user && (
          <>
            <Link className="hover:text-pink-600" to="/explore">
              Explorar
            </Link>
            <Link className="hover:text-pink-600" to="/matches">
              Matches
            </Link>
            <Link className="hover:text-pink-600" to="/chats">
              Chats
            </Link>
            <Link className="hover:text-pink-600" to="/profile">
              Perfil
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

