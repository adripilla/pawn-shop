"use client"; // Marcar este componente como cliente

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard2';

const ExpiredProductsPage = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los productos expirados
  useEffect(() => {
    const fetchExpiredProducts = async () => {
      try {
        const response = await fetch('/api/expired-products');
        if (!response.ok) throw new Error('Error al obtener los productos expirados');

        const products = await response.json();
        setExpiredProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredProducts();
  }, []);

  if (loading) return <p>Cargando productos expirados...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-8 container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos Expirados</h1>

      {/* Mostrar productos expirados */}
      {expiredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay productos expirados.</p>
      )}
    </div>
  );
};

export default ExpiredProductsPage;
