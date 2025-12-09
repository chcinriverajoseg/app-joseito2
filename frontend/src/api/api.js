// frontend/src/api/api.js
/*import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Si tienes JWT guardado en localStorage:
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;*/

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;

