import axios from "axios";

const api = axios.create({
  baseURL: "https://app-joseito2.onrender.com/api",
  withCredentials: true,
});

export default api;
