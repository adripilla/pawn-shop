// src/components/AdminProtectedRoute.jsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AdminProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const role = Cookies.get('userRole');
    if (role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      router.push('/client'); // Redirige a una página de acceso denegado
    }
  }, [router]);

  // Muestra un indicador de carga mientras se verifica el rol
  if (isAdmin === null) return <p>Verificando permisos...</p>;

  // Si es administrador, muestra los hijos
  return isAdmin ? <>{children}</> : null;
};

export default AdminProtectedRoute;
