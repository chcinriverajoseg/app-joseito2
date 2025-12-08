// src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import UserCard from '@/ui/userCard';
import Loader from '@/ui/loader';
import ErrorMessage from '@/ui/ErrorMessage';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users');
        setUsers(res.data);
      } catch  {
        setError('Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(u => <UserCard key={u._id} user={u} />)}
    </div>
  );
};

export default Users;
