// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de que este patrón incluya todas las rutas relevantes
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Asegúrate de que DaisyUI esté incluido como un plugin
};
