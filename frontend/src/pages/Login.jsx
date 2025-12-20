import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { useUserContext } from "@/context/UserContext";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

export default function Login() {
  const { login } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  setError("");

  try {
   const res = await api.post("/api/auth/login", {
  email,
  password,
});


    console.log("LOGIN OK", res.data);

    login(res.data.user, res.data.token);
    navigate("/explore");
  } catch (err) {
    console.error(err);
    setError("Credenciales incorrectas");
  }
};

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
  type="button"
  className="w-full mt-4"
  onClick={handleLogin}
>
  Entrar
</Button>

    </div>
  );
}
