import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req) {
  await connectToDatabase();

  const url = new URL(req.url);
  const email = url.searchParams.get('email');

  // Agregar logs para depuración
  console.log("Email recibido para búsqueda de productos:", email);

  if (!email) {
    console.log("No se proporcionó un email en la solicitud");
    return new Response(JSON.stringify({ message: 'Email no proporcionado' }), { status: 400 });
  }

  try {
    const products = await Product.find({ email });
    console.log("Productos encontrados:", products); // Log de los productos encontrados

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return new Response(JSON.stringify({ message: 'Error al obtener productos' }), { status: 500 });
  }
}
