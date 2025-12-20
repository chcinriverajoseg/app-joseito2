import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    interests: "",
  });

  const handleRegister = async () => {
    try {
      const sendData = {
        ...form,
        interests: form.interests
          ? form.interests.split(",").map(i => i.trim())
          : [],
      };

      await api.post("/api/auth/register", sendData);
      navigate("/login");
    } catch {
      setError("Error al registrar");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <Input label="Nombre" onChange={e => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <Input label="Contraseña" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <Input label="Intereses" onChange={e => setForm({ ...form, interests: e.target.value })} />

      <Button className="w-full mt-4" onClick={handleRegister}>
        Registrarme
      </Button>
    </div>
  );
}

