// src/app/api/users/login/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, pass } = await req.json();

    // Verificar si el usuario existe y la contraseña coincide
    const user = await User.findOne({ email });
    if (!user || user.pass !== pass) {
      return new Response(JSON.stringify({ message: 'Correo o contraseña incorrectos' }), { status: 401 });
    }

    // Retornar el rol y el email del usuario si el login es exitoso
    return new Response(JSON.stringify({ message: 'Inicio de sesión exitoso', role: user.role, email: user.email }), { status: 200 });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), { status: 500 });
  }
}
