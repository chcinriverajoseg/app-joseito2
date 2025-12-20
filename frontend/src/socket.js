/*import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_API_URL, {
    auth: {
      token,
    },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("🟢 Socket conectado:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket desconectado");
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};*/

import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
  autoConnect: false, // importante
});

export default socket;
