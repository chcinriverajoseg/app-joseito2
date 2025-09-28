import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/useUser";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import axios from "@/api/axios";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { email, password });

      // Guardamos token y usuario
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      navigate("/perfil"); // 👈 Te lleva al perfil después de loguearse
    } catch (error) {
      console.error("Error login:", error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
        Iniciar Sesión
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
