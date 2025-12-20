import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useUserContext } from "@/context/UserContext";
import Button from "@/ui/Button";
import { useNavigate } from "react-router-dom";

export default function ExplorePage() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔄 Cargar usuarios
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/api/users/explore");
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Error explore:", err);
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // ❤️ Like
  const handleLike = async (userId) => {
    try {
      const res = await api.put(`/api/users/like/${userId}`);

      // Si hay match → ir a chat
      if (res.data.match) {
        navigate(`/chats/${userId}`);
      }

      // Quitar usuario de la lista
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("❌ Error like:", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (users.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No hay más usuarios para explorar 👀
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-3xl font-bold text-pink-600">
            {u.name.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-3 font-semibold text-lg">{u.name}</h2>

          {u.interests?.length > 0 && (
            <p className="text-sm text-gray-500 mt-1 text-center">
              {u.interests.join(", ")}
            </p>
          )}

          <Button
            className="mt-4 w-full"
            onClick={() => handleLike(u._id)}
          >
            ❤️ Me gusta
          </Button>
        </div>
      ))}
    </div>
  );
}
