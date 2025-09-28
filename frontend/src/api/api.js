// frontend/src/api/api.js
import axios from 'axios';

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

export default API;
