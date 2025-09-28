import React from "react";
import { useUser } from "@/context/useUser";
import Navbar from "@/ui/Navbar";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Bienvenido, {user?.name}!</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
