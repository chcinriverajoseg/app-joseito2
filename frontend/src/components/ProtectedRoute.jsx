import { Navigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUserContext();

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Cargando...
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
