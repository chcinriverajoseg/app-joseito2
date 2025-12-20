/*import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

export default function Navbar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-pink-500">
          App-Joseito 💘
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/explore" className="hover:text-pink-500">
              Explorar
            </Link>
            <Link to="/matches" className="hover:text-pink-500">
              Matches
            </Link>
            <Link to="/profile" className="hover:text-pink-500">
              Perfil
            </Link>

            <button
              onClick={handleLogout}
              className="bg-pink-500 text-white px-4 py-1.5 rounded-lg hover:bg-pink-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}*/
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import Button from "@/ui/Button";

export default function Navbar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // 👈 No mostrar navbar si no está logueado

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/explore" className="text-xl font-bold text-pink-500">
        💖 Joseito
      </Link>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link
          to="/explore"
          className="text-gray-700 hover:text-pink-500 font-medium"
        >
          Explorar
        </Link>

        <Link
          to="/matches"
          className="text-gray-700 hover:text-pink-500 font-medium"
        >
          Matches
        </Link>

        <Link
          to="/chat"
          className="text-gray-700 hover:text-pink-500 font-medium"
        >
          Chat
        </Link>
      </div>

      {/* Usuario + logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          👤 {user.name || user.email}
        </span>

        <Button variant="outline" onClick={handleLogout}>
          Salir
        </Button>
      </div>
    </nav>
  );
}
