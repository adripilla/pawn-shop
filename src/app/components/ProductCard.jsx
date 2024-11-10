// src/components/ProductCard.jsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ProductCard = ({ product, onDelete }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificar el rol del usuario al cargar el componente
  useEffect(() => {
    const role = Cookies.get('userRole');
    setIsAdmin(role === 'admin');
  }, []);

  // Función para manejar la eliminación del producto
  const handleDelete = async () => {
    if (!isAdmin) return; // Asegura que solo los admins puedan eliminar

    try {
      const response = await fetch('/api/inventory/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product._id }),
      });

      if (response.ok) {
        alert('Producto eliminado exitosamente');
        onDelete(product._id); // Llama a la función de eliminación en el componente padre
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el producto: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error en la solicitud para eliminar el producto');
    }
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md text-center">
      {/* Botón de eliminación visible solo para admins */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          aria-label="Eliminar producto"
        >
          X
        </button>
      )}

      {/* Mostrar los detalles del producto */}
      <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
      <p className="text-gray-600">Propietario: {product.email}</p>
      <p className="text-gray-600">Monto Prestado: ${product.dineroPrestado}</p>
      <p className="text-gray-600">Monto Venta: ${product.dineroVenta}</p>
      <p className="text-gray-600">Fecha Límite: {new Date(product.fechaLimite).toLocaleDateString()}</p>
    </div>
  );
};

export default ProductCard;
