// src/app/components/AdminNav.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ClientNav = () => {
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina la cookie de rol de usuario o token de autenticación
    Cookies.remove('userRole');

    // Redirige a la página de inicio de sesión
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Título */}
        <div className="text-2xl font-bold">
          <Link href="/client">Casa de Empeño</Link>
        </div>
        
        {/* Links de Navegación */}
        <div className="flex gap-4">
          <Link href="/client" className="hover:underline">
            Home
          </Link>
          <Link href="/client/my-products" className="hover:underline">
            Productos
          </Link>
          <Link href="/client/expired-product" className="hover:underline">
            Venta
          </Link>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button onClick={handleLogout} className="btn btn-error ml-4">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default ClientNav;
