// src/app/admin/inventory/searchInventory.jsx
"use client"; // Marcar este componente como cliente

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import AdminProtectedRoute  from '../../components/AdminProtectedRoute';
import AdminNav from '../../components/navAdmin';

const SearchInventory = () => {
  const [products, setProducts] = useState([]);       // Lista de productos
  const [searchEmail, setSearchEmail] = useState(''); // Estado para el campo de búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados por email

  // Función para obtener todos los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/inventory');
        if (!response.ok) throw new Error('Error al obtener los productos');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Mostrar todos los productos por defecto
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  // Función para manejar la búsqueda por email
  const handleSearch = (e) => {
    setSearchEmail(e.target.value);
    if (e.target.value === '') {
      // Mostrar todos los productos si el campo de búsqueda está vacío
      setFilteredProducts(products);
    } else {
      // Filtrar productos por correo electrónico
      const filtered = products.filter((product) =>
        product.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <> 
    <AdminNav/>
    <AdminProtectedRoute/> 
    <div className="p-8 container mx-auto">
       
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Buscar en Inventario por Correo</h1>

      {/* Campo de búsqueda por email */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Buscar por Correo Electrónico</label>
        <input
          type="email"
          value={searchEmail}
          onChange={handleSearch}
          className="input input-bordered w-full mt-1"
          placeholder="Ingrese el correo electrónico para filtrar"
        />
      </div>

      {/* Lista de productos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} isAdmin={true} />
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron productos para este correo.</p>
        )}
      </div>
    </div>
  </>);
};

export default SearchInventory;
