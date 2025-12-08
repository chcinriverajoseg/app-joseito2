// src/socket/socketProvider.jsx
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./socketContext";
import { useUser } from "@/context/useUser";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export default function SocketProvider({ children }) {
  const { user } = useUser();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user?.token) return;
    const s = io(SOCKET_URL, { auth: { token: user.token } });
    setSocket(s);
    return () => s.disconnect();
  }, [user?.token]);

  const value = useMemo(() => socket, [socket]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
