import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula tiempo de carga de contexto/localStorage
    setTimeout(() => setLoading(false), 200);
  }, []);

  if (loading) return null;

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
