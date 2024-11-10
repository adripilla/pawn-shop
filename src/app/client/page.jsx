// src/app/client/page.jsx
"use client"; // Marcar este componente como cliente

import React, { useState, useEffect } from 'react';
import ClientNav from '../components/ClientNav';
import Cookies from 'js-cookie'; // Importar Cookies para obtener el email

const ClientDashboard = () => {
  const [myProductsCount, setMyProductsCount] = useState(0);
  const [expiredProductsCount, setExpiredProductsCount] = useState(0);
  const [newProductsToday, setNewProductsToday] = useState(0);
  const [email, setEmail] = useState(''); // Estado para almacenar el correo del cliente

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = Cookies.get('email'); // Obtener el correo del cliente actual desde la cookie
        setEmail(email); // Guardar el email en el estado

        // Obtener productos del cliente utilizando el endpoint correcto
        const myProductsResponse = await fetch(`/api/inventory/product?email=${email}`);
        const myProducts = await myProductsResponse.json();
        setMyProductsCount(myProducts.length);

        // Filtrar productos agregados hoy
        const today = new Date().toISOString().slice(0, 10); // Formato AAAA-MM-DD
        const newProductsTodayCount = myProducts.filter(
          (item) => item.createdAt && item.createdAt.startsWith(today)
        ).length;
        setNewProductsToday(newProductsTodayCount);

        // Obtener productos expirados (en venta)
        const expiredProductsResponse = await fetch('/api/expired-products');
        const expiredProducts = await expiredProductsResponse.json();
        setExpiredProductsCount(expiredProducts.length);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <ClientNav />

      <div className="p-8 container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard del Cliente</h1>
        {/* Mostrar el correo del cliente */}
        <h2 className="text-lg text-gray-600 mb-6">Correo actual: {email || "No disponible"}</h2>

        {/* Sección de Tarjetas de Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Mis Productos</h2>
            <p className="text-2xl font-bold text-blue-500">{myProductsCount}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Productos Expirados (En Venta)</h2>
            <p className="text-2xl font-bold text-red-500">{expiredProductsCount}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Productos Agregados Hoy</h2>
            <p className="text-2xl font-bold text-purple-500">{newProductsToday}</p>
          </div>
        </div>

        {/* Sección de Accesos Directos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Mis Productos</h3>
            <p className="text-gray-600 mb-4">Visualiza los productos que has puesto en empeño.</p>
            <a href="/client/my-products" className="btn btn-primary">Ir a Mis Productos</a>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Productos Expirados (En Venta)</h3>
            <p className="text-gray-600 mb-4">Explora los productos en venta que han expirado.</p>
            <a href="/client/expired-product" className="btn btn-primary">Ver Productos Expirados</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
