// src/app/api/users/delete/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { id } = await req.json(); // Obtiene el ID del usuario del cuerpo de la solicitud

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID de usuario no proporcionado' }), { status: 400 });
    }

    // Intenta encontrar y eliminar el usuario
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Usuario eliminado exitosamente' }), { status: 200 });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), { status: 500 });
  }
}
