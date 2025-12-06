import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:4000/api/users";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    interests: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registro disparado ✔");

    let formattedInterests =
      form.interests.split(",").map((i) => i.trim());

    try {
      const res = await axios.post(`${API}/register`, {
        ...form,
        interests: formattedInterests,
      });

      console.log("Registrado:", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error Registro:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Registro</h2>

        <input
          name="name"
          placeholder="Nombre"
          className="w-full p-2 border rounded mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          className="w-full p-2 border rounded mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="interests"
          placeholder="Intereses (separados por coma)"
          className="w-full p-2 border rounded mb-3"
          value={form.interests}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
