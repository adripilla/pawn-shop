// src/app/admin/inventory/page.jsx
"use client"; // Marcar este componente como cliente

import React, { useState } from 'react';
import AdminProtectedRoute  from '../../components/AdminProtectedRoute';
import AdminNav from '../../components/navAdmin';

const InventoryPage = () => {
  const [newProduct, setNewProduct] = useState({ name: '', email: '', dineroPrestado: '' });

  // Función para manejar el envío del formulario de nuevo producto
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        alert('Producto agregado exitosamente');
        setNewProduct({ name: '', email: '', dineroPrestado: '' }); // Limpiar el formulario
      } else {
        console.error('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <AdminNav />
    <AdminProtectedRoute/> 
    <div className="p-8 container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventario</h1>

      {/* Formulario para agregar un nuevo producto */}
      <form onSubmit={handleAddProduct} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Agregar Producto</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo del Usuario</label>
          <input
            type="email"
            value={newProduct.email}
            onChange={(e) => setNewProduct({ ...newProduct, email: e.target.value })}
            className="input input-bordered w-full mt-1"
            placeholder="Ingrese el correo del usuario asociado"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Dinero Prestado</label>
          <input
            type="number"
            value={newProduct.dineroPrestado}
            onChange={(e) => setNewProduct({ ...newProduct, dineroPrestado: e.target.value })}
            className="input input-bordered w-full mt-1"
            placeholder="Ingrese el monto prestado"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Agregar Producto</button>
      </form>
    </div>
  </>);
};

export default InventoryPage;
