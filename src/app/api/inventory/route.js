// src/app/api/inventory/route.js
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req) {
  await connectToDatabase();

  // Obtener el parámetro de búsqueda 'email' si existe
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  // Filtrar productos por email si se proporciona, si no, devolver todos
  const filter = email ? { userEmail: email } : {};
  const products = await Product.find(filter);

  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  await connectToDatabase();
  const data = await req.json();

  // Obtener la fecha actual
  const createdAt = new Date();

  // Calcular fecha límite (2 semanas a partir de la fecha actual)
  const fechaLimite = new Date();
  fechaLimite.setDate(createdAt.getDate() + 14);

  // Calcular dinero de venta como 90% del dinero prestado
  const dineroVenta = data.dineroPrestado * 0.9;

  // Crear el nuevo producto con los campos calculados y los datos del cliente
  const newProduct = new Product({
    ...data,
    createdAt,
    fechaLimite,
    dineroVenta,
  });

  await newProduct.save();
  return new Response(JSON.stringify(newProduct), { status: 201 });
}
