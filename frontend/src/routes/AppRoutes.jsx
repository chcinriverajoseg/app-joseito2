/*import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import ExplorePage from "@/pages/ExplorePage";
import MatchesPage from "@/pages/MatchesPage";
import ProfilePage from "@/pages/ProfilePage";
import ChatPage from "@/pages/ChatPage";
import ChatRoom from "@/pages/ChatRooom";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* rutas protegidas *//*}
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <ExplorePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <MatchesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
  path="/chats/:userId"
  element={
    <ProtectedRoute>
      <ChatRoom />
    </ProtectedRoute>
  }
/>


     <Route
  path="/chats/:userId"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}
*/

import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

import Navbar from "@/components/Navbar";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ExplorePage from "@/pages/ExplorePage";
import MatchesPage from "@/pages/MatchesPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
  const { user, loading } = useUserContext();

  if (loading) {
    return <div className="p-10 text-center">Cargando...</div>;
  }

  return (
    <>
      {/* ✅ Navbar SOLO si el usuario está logueado */}
      {user && <Navbar />}

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/explore" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/explore" />} />

        {/* Protegidas */}
        <Route path="/explore" element={user ? <ExplorePage /> : <Navigate to="/login" />} />
        <Route path="/matches" element={user ? <MatchesPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
