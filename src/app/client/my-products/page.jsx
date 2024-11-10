// src/app/client/my-products/page.jsx
"use client"; // Marcar este componente como cliente

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import Cookies from 'js-cookie';

const MyProductsPage = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = Cookies.get('email'); // Obtener el correo del cliente desde la cookie

  // Función para obtener los productos del cliente
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await fetch(`/api/inventory/product?email=${email}`); // Usa la cookie `email` para la consulta
        if (!response.ok) throw new Error('Error al obtener los productos');
        
        const products = await response.json();
        setMyProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [email]); // Dependencia `email` para asegurarse de que se obtenga de la cookie

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Productos</h1>
      
      {/* Mostrar el email del cliente */}
      <p className="text-gray-600 mb-4">Correo asociado: {email}</p>

      {/* Mostrar productos del cliente */}
      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <ProductCard key={product._id} product={product} isAdmin={false} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tienes productos en empeño.</p>
      )}
    </div>
  );
};

export default MyProductsPage;
