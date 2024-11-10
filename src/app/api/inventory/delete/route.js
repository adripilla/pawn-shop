// src/app/api/inventory/delete/route.js
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req) {
  await connectToDatabase();

  try {
    const { id } = await req.json(); // Obtiene el ID del producto del cuerpo de la solicitud

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID de producto no proporcionado' }), { status: 400 });
    }

    // Intenta encontrar y eliminar el producto
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ message: 'Producto no encontrado' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Producto eliminado exitosamente' }), { status: 200 });
  } catch (error) {
   
    return new Response(JSON.stringify({ message: 'Error en el servidor' }), { status: 500 });
  }
}
