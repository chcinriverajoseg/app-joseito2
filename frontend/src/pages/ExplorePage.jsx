import { useEffect, useState } from "react";
import api from "@/api/axios";
import Card from "@/ui/Card";
import Button from "@/ui/Button";
import { useUserContext } from "@/context/UserContext";

export default function ExplorePage() {
  const { token } = useUserContext();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const res = await api.get("/users/explore", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfiles(res.data);
      } catch (err) {
        console.error("Error cargando perfiles:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [token]);

  const sendLike = async (id) => {
    try {
      await api.post(`/users/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfiles(profiles.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error dando like:", err);
    }
  };

  const skip = (id) => {
    setProfiles(profiles.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Explorar 💘</h1>

      {loading && <p className="text-center">Cargando perfiles...</p>}

      {!loading && profiles.length === 0 && (
        <p className="text-center">No hay más perfiles por ahora 😅</p>
      )}

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {profiles.map((p) => (
          <Card key={p._id} className="p-6 space-y-4">
            <div className="w-20 h-20 mx-auto bg-indigo-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
              {p.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-xl text-center font-bold">{p.name}</h2>
            <p className="text-center text-gray-500">{p.bio || "Sin descripción"}</p>

            <div className="flex gap-4 mt-4">
              <Button
                className="w-1/2 bg-gray-400 hover:bg-gray-500"
                onClick={() => skip(p._id)}
              >
                ❌ Skip
              </Button>

              <Button
                className="w-1/2 bg-pink-500 hover:bg-pink-600"
                onClick={() => sendLike(p._id)}
              >
                💖 Like
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
