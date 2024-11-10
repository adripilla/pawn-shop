// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
      <p className="text-gray-600">Precio de Venta: ${product.dineroVenta}</p>
      <p className="text-sm text-gray-500">Fecha de Expiración: {new Date(product.movedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProductCard;
