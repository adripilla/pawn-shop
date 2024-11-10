// src/app/api/users/register/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { name, email, pass, role } = await req.json();

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'El correo ya está en uso' }), { status: 400 });
    }

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      pass,
      role: role || 'user',
      createdAt: new Date(),
    });

    await newUser.save();

    return new Response(JSON.stringify({ message: 'Usuario creado exitosamente', role: newUser.role }), { status: 201 });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), { status: 500 });
  }
}
