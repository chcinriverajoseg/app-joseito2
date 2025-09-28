import React, { useState } from "react";
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

export default Register;
