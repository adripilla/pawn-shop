// src/app/api/expired-products/route.js
import connectToDatabase from '@/lib/mongodb';
import ExpiredProduct from '@/models/ExpiredProduct';

export async function GET(req) {
  await connectToDatabase();

  try {
    const expiredProducts = await ExpiredProduct.find({});
    return new Response(JSON.stringify(expiredProducts), { status: 200 });
  } catch (error) {
    console.error('Error al obtener los productos expirados:', error);
    return new Response(JSON.stringify({ message: 'Error al obtener productos expirados' }), { status: 500 });
  }
}
