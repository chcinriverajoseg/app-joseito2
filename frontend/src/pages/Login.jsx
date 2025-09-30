import React, { useState } from "react";
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
}
