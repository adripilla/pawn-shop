// src/app/admin/inventory/ExpiredProductsPage.jsx
"use client"; // Marcar este componente como cliente

import React, { useState, useEffect } from 'react';
import AdminProtectedRoute  from '../../components/AdminProtectedRoute';
import AdminNav from '../../components/navAdmin';

const ExpiredProductsPage = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Función para obtener los productos expirados
  useEffect(() => {
    const fetchExpiredProducts = async () => {
      try {
        const response = await fetch('/api/inventory'); // Endpoint para obtener todos los productos
        if (!response.ok) throw new Error('Error al obtener los productos');
        const products = await response.json();
        
        // Filtrar productos cuya fecha límite haya pasado
        const expired = products.filter(product => new Date(product.fechaLimite) < new Date());
        setExpiredProducts(expired);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchExpiredProducts();
  }, []);

  // Función para mover y eliminar los productos expirados
  const handleMoveExpired = async () => {
    try {
      const response = await fetch('/api/inventory/moveExpired', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Error al mover productos expirados');
      
      setMessage('Productos expirados movidos y eliminados exitosamente');
      setExpiredProducts([]); // Limpiar la lista de productos expirados
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al mover productos expirados');
    }
  };

  return (
    <>
    <AdminNav/>
    <AdminProtectedRoute/> 
    <div className="p-8 container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos Expirados</h1>
      
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      {expiredProducts.length > 0 ? (
        <>
          {/* Lista de productos expirados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expiredProducts.map((product) => (
              <div key={product._id} className="p-4 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
                <p className="text-gray-600">Monto Venta: ${product.dineroVenta}</p>
                <p className="text-gray-600">Fecha Límite: {new Date(product.fechaLimite).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {/* Botón para mover y eliminar productos expirados */}
          <button
            onClick={handleMoveExpired}
            className="mt-6 btn btn-danger w-full"
          >
            Mover y Eliminar Productos Expirados
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">No hay productos expirados.</p>
      )}
    </div>
/</>  );
};

export default ExpiredProductsPage;
