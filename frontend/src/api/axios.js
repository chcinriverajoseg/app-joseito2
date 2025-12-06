/*// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (!token) {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        token = parsed?.token;
      } catch (err) {
        console.error("Error al parsear localStorage user:", err);
      }
    }
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("user");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
*/

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",   // ← ASEGÚRATE QUE ESTE ES TU BACKEND
  withCredentials: true,
});

export default api;

