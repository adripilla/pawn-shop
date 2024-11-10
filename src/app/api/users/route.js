// src/app/api/users/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();

    // Obtener todos los usuarios de la base de datos
    const users = await User.find();

    // Retornar la lista de usuarios en formato JSON
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), { status: 500 });
  }
}
