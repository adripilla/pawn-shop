// src/app/admin/users/UserManagement.jsx
"use client"; // Marcar este componente como cliente

import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/navAdmin';
import AdminProtectedRoute  from '../../components/AdminProtectedRoute';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los usuarios de la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Corregir la URL
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Función para eliminar un usuario
  const deleteUser = async (userId) => {
    try {
      const response = await fetch('/api/users/delete', { // Corregir la URL
        method: 'POST', // Cambiar el método a POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }), // Enviar el ID del usuario en el cuerpo de la solicitud
      });
      if (!response.ok) throw new Error('Error al eliminar el usuario');
      setUsers(users.filter((user) => user._id !== userId)); // Actualizar la lista
      alert('Usuario eliminado exitosamente');
    } catch (err) {
      alert('Error al eliminar el usuario');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <AdminNav />
      <AdminProtectedRoute/> 
      <div className="p-8 container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h1>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 border-b text-left">Nombre</th>
              <th className="py-2 border-b text-left">Correo Electrónico</th>
              <th className="py-2 border-b text-left">Rol</th>
              <th className="py-2 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 border-b">{user.name}</td>
                <td className="py-2 border-b">{user.email}</td>
                <td className="py-2 border-b">{user.role}</td>
                <td className="py-2 border-b">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                  {/* Aquí podrías añadir más botones para editar el usuario */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserManagement;
