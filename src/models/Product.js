// src/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },            // Nombre del artículo
  email: { type: String, required: true },           // Correo del usuario asociado al artículo
  createdAt: { type: Date, default: Date.now },      // Fecha de creación del registro
  dineroPrestado: { type: Number, required: true },  // Monto de dinero prestado por el artículo
  dineroVenta: { type: Number, required: true },     // Monto de venta del artículo (si se vende)
  fechaLimite: { type: Date, required: true },       // Fecha límite para el préstamo o redención
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
