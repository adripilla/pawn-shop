// src/app/admin/page.jsx
"use client"; // Marcar este componente como cliente

import React, { useState, useEffect } from 'react';
import AdminNav from '../components/navAdmin';
import AdminProtectedRoute  from '../components/AdminProtectedRoute';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [newProductsToday, setNewProductsToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('/api/users');
        const users = await userResponse.json();
        setUserCount(users.length);

        const inventoryResponse = await fetch('/api/inventory');
        const inventoryItems = await inventoryResponse.json();
        setInventoryCount(inventoryItems.length);

        // Filtrar productos agregados hoy, verificando si createdAt está definido
        const today = new Date().toISOString().slice(0, 10); // Formato AAAA-MM-DD
        const newProductsTodayCount = inventoryItems.filter(
          (item) => item.createdAt && item.createdAt.startsWith(today)
        ).length;
        setNewProductsToday(newProductsTodayCount);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <AdminProtectedRoute/> 
      <div className="p-8 container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard del Administrador</h1>

        {/* Sección de Tarjetas de Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Usuarios</h2>
            <p className="text-2xl font-bold text-blue-500">{userCount}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Artículos en Empeño</h2>
            <p className="text-2xl font-bold text-green-500">{inventoryCount}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Productos Agregados Hoy</h2>
            <p className="text-2xl font-bold text-purple-500">{newProductsToday}</p>
          </div>
        </div>

        {/* Sección de Accesos Directos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Gestión de Usuarios</h3>
            <p className="text-gray-600 mb-4">Administra las cuentas de los usuarios registrados en la plataforma.</p>
            <a href="/admin/users" className="btn btn-primary">Ir a Usuarios</a>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Prestamo</h3>
            <p className="text-gray-600 mb-4">Agrega nuevo productos.</p>
            <a href="/admin/inventory" className="btn btn-primary">Ir a Prestamo</a>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Inventario</h3>
            <p className="text-gray-600 mb-4">Administra el inventario.</p>
            <a href="/admin/products" className="btn btn-primary">Ir a Inventario</a>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Expirados</h3>
            <p className="text-gray-600 mb-4">Visualiza y gestiona los artículos con fecha expirada.</p>
            <a href="/admin/expired" className="btn btn-primary">Ir a Expirados</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
