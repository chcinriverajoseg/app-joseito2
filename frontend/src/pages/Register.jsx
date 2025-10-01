/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/useUser";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import axios from "@/api/axios";

const Register = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", { name, email, password });
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error register:", error);
      alert("Error al registrarse");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Registrarse</Button>
      </form>
    </div>
  );
};

export default Register;*/



/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import Card from "@/ui/Card";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import ErrorMessage from "@/ui/ErrorMessage";
import Navbar from "@/ui/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/users/register", form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/explore");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-md mx-auto p-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Crear cuenta</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
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
              Registrarse
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}*/

// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error en registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Crear cuenta
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-lg border focus:ring focus:outline-none"
        />
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
          Registrarse
        </button>
      </form>
    </div>
  );
}

