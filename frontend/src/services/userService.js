import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

// Obtener lista de usuarios
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return [];
  }
};

// Dar like
export const sendLike = async (token, targetId) => {
  try {
    const response = await axios.post(
      `${API_URL}/like/${targetId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error enviando like:", error);
    return null;
  }
};
