// src/app/components/AdminNav.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AdminNav = () => {
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
          <Link href="/admin">Casa de Empeño - Admin</Link>
        </div>
        
        {/* Links de Navegación */}
        <div className="flex gap-4">
          <Link href="/admin" className="hover:underline">
            Home
          </Link>
          <Link href="/admin/users" className="hover:underline">
            Usuarios
          </Link>
          <Link href="/admin/products" className="hover:underline">
            Inventario
          </Link>
          <Link href="/admin/inventory" className="hover:underline">
            Prestamo
          </Link>
          <Link href="/admin/expired" className="hover:underline">
            Expired
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

export default AdminNav;
