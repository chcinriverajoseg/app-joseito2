import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia contexto y localStorage
    navigate("/login");
  };

  return (
    <header style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
      <Link to="/">Inicio</Link>

      {user ? (
        <>
          <span>Hola, {user.name}</span>
          <Link to="/profile">Perfil</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </header>
  );
}
