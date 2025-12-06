import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit ejecutado ✔");

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      console.log("Respuesta login:", res.data);

      // Guardar usuario/token en contexto
      loginUser(res.data.user, res.data.token);

      navigate("/explore");
    } catch (err) {
      console.log("Error login:", err);

      setErrorMsg(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        {errorMsg && <p className="text-red-500 text-center mb-3">{errorMsg}</p>}

        <label className="block mb-3">
          <span>Email</span>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded mt-1 dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span>Contraseña</span>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mt-1 dark:bg-gray-700 dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
