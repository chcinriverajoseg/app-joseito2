/*import { useEffect, useState } from "react";
import Card from "@/ui/Card.jsx";
import Input from "@/ui/Input.jsx";
import Button from "@/ui/Button.jsx";
import api from "@/api/axios";
import { useUserContext } from "@/context/UserContext";

export default function ProfilePage() {
  const { user, updateUserContext } = useUserContext();

  const [form, setForm] = useState({
    name: "",
    bio: "",
  });

  const [saving, setSaving] = useState(false);

  // ▶ Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        bio: user.bio || "",
      });
    }
  }, [user]);

  // ▶ Actualizar inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ▶ Guardar cambios
  const handleSave = async () => {
    if (!form.name.trim()) return alert("El nombre es obligatorio");

    setSaving(true);
    try {
      const { data } = await api.put(`/users/${user._id}`, form);

      updateUserContext(data);
      alert("Perfil actualizado correctamente ✔️");
    } catch (error) {
      console.error("Error guardando perfil:", error);
      alert("No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start pt-24 px-4">
      <div className="max-w-md w-full">
        <Card className="p-6 space-y-6 text-center">

          {/* Avatar simple con inicial *//*}
          <div className="w-24 h-24 mx-auto bg-pink-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <h2 className="text-xl font-semibold">Editar Perfil</h2>

          <Input
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Biografía"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            textarea
            rows={4}
          />

          <Button
            disabled={saving}
            onClick={handleSave}
            className="w-full text-lg"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Card>
      </div>
    </div>
  );
}*/

import { useUserContext } from "@/context/UserContext";
import Card from "@/ui/Card";
import Button from "@/ui/Button";

export default function ProfilePage() {
  const { user } = useUserContext();

  if (!user) {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <Card className="p-5 shadow-lg rounded-xl bg-white">
        <h1 className="text-2xl font-bold mb-3">Tu Perfil</h1>

        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {user.interests && (
          <p className="mt-2">
            <strong>Intereses:</strong> {user.interests.join(", ")}
          </p>
        )}

        <Button className="w-full mt-4">Editar Perfil</Button>
      </Card>
    </div>
  );
}

