/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import ErrorMessage from "@/ui/ErrorMessage";
import Navbar from "@/ui/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/users/login", form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/explore");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-md mx-auto p-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
} */

  // src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", form);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/explore");
    } catch (err) {
      setError(err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Iniciar Sesión
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-lg border focus:ring focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-lg border focus:ring focus:outline-none"
        />
        <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
          Entrar
        </button>
      </form>
    </div>
  );
}

