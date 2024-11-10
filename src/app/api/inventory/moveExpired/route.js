// src/app/api/inventory/moveExpired/route.js
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import ExpiredProduct from '@/models/ExpiredProduct';

export async function POST(req) {
  await connectToDatabase();

  try {
    // Obtener productos cuya fecha límite ya haya pasado
    const expiredProducts = await Product.find({ fechaLimite: { $lt: new Date() } });

    // Mover cada producto a la colección de productos expirados
    const movedProducts = await Promise.all(
      expiredProducts.map(async (product) => {
        const expiredProduct = new ExpiredProduct({
          name: product.name,
          dineroVenta: product.dineroVenta,
        });
        await expiredProduct.save();
        return product._id;
      })
    );

    // Eliminar los productos expirados de la colección original
    await Product.deleteMany({ _id: { $in: movedProducts } });

    return new Response(JSON.stringify({ message: 'Productos expirados movidos y eliminados exitosamente' }), { status: 200 });
  } catch (error) {
    console.error('Error al mover productos expirados:', error);
    return new Response(JSON.stringify({ message: 'Error al mover productos expirados' }), { status: 500 });
  }
}
