// src/app/components/TestComponent.tsx
import React from 'react';

const TestComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 text-center">
      <h1 className="text-3xl font-bold text-blue-500 dark:text-blue-300">
        Bienvenido a la Casa de Empeño
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Esta es una prueba de Tailwind CSS y DaisyUI
      </p>

      <input
        type="text"
        placeholder="Ingresa algo aquí"
        className="input input-bordered w-full max-w-xs"
      />

      <button className="btn btn-primary mt-4">
        Probar Botón
      </button>
    </div>
  );
};

export default TestComponent;
