import { Routes, Route } from "react-router-dom";
import Navbar from "./ui/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExplorePage from "./pages/ExplorePage";
import MatchesPage from "./pages/MatchesPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./routes/ProtectedRoute";
import { Navigate } from "react-router-dom";



export default function App() {
  return (
    <>
      {/* Navbar decide solo si mostrarse */}
      <Navbar />

      <div className="pt-16">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protegidas */}
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

          {/* Chat list (opcional a futuro) */}
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* Chat con usuario específico */}
          <Route
            path="/chats/:userId"
            element={
              <ProtectedRoute>
                <ChatPage />
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
            path="/chat" 
            element={
            <Navigate to="/matches" replace />} />



        </Routes>
      </div>
    </>
  );
}


