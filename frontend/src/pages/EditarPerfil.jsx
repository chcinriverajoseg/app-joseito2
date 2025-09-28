import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import { useUser } from "@/context/UserContext";
import api from "@/api/axios";

export default function EditarPerfil() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    bio: user?.bio || "",
    profileImage: user?.profileImage || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/users/${user._id}`, form);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/perfil");
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("No se pudo actualizar el perfil");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-6">
          Editar Perfil
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Edad</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="input"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Foto de perfil (URL)</label>
            <input
              type="text"
              name="profileImage"
              value={form.profileImage}
              onChange={handleChange}
              className="input"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
