import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import api from "@/api/axios";
import { useUser } from "@/context/UserContext";

export default function EditarPerfil() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    bio: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);

  // Rellenar formulario con datos del usuario actual
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        bio: user.bio || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put(`/users/${user._id}`, form);
      setUser(data); // actualizar el contexto global
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/perfil");
    } catch (err) {
      console.error("❌ Error al actualizar perfil:", err);
      alert("Hubo un error al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-8">
          Editar Perfil
        </h1>

        <form
          onSubmit={handleSubmit}
          className="card p-6 space-y-4 bg-white dark:bg-gray-800 shadow-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Edad
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Biografía
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="input h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Foto de Perfil (URL)
            </label>
            <input
              type="text"
              name="profileImage"
              value={form.profileImage}
              onChange={handleChange}
              className="input"
              placeholder="https://..."
            />
          </div>

          {form.profileImage && (
            <div className="flex justify-center">
              <img
                src={form.profileImage}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
