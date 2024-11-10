// src/app/components/AuthForm.jsx
"use client"; // Indica que es un componente de cliente

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthForm = () => {
  const router = useRouter(); // Instancia de useRouter para redirección
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que las contraseñas coincidan si está en modo de registro
    if (!isLogin && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Prepara los datos de usuario
    const userData = {
      name: !isLogin ? name : undefined,
      email,
      pass: password, // Usa "pass" si el modelo espera este campo en lugar de "password"
    };

    try {
      // Envía la solicitud a la API adecuada según el modo de autenticación
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Maneja la respuesta de la API
      if (response.ok) {
        const data = await response.json();
        console.log('Usuario autenticado:', data);

        // Guarda el rol en una cookie
        console.log('Email guardado en cookie:', data.email);
        console.log('Email guardado en cookie:', data.role);

        Cookies.set('userRole', data.role, { expires: 1 }); 
        Cookies.set('email',data.email);// Expira en 1 día

        alert(isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso');

        // Redirigir según el rol del usuario
        if (data.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/client');
        }

        // Limpiar el formulario después del inicio de sesión/registro exitoso
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Manejo de errores en caso de fallo de autenticación
        const errorData = await response.json();
        console.error('Error al enviar la solicitud:', errorData.message || 'Error desconocido');
        alert(errorData.message || 'Hubo un error en la autenticación');
      }
    } catch (error) {
      // Captura cualquier error de red o de solicitud
      console.error('Error en la solicitud:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de nombre, solo visible en modo de registro */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mt-1"
                placeholder="Ingrese su nombre"
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          {/* Confirmar contraseña solo en modo de registro */}
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full mt-1"
                placeholder="Confirme su contraseña"
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-blue-500 hover:underline font-medium"
          >
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
