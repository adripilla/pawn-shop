// src/models/ExpiredProduct.js
import mongoose from 'mongoose';

const ExpiredProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dineroVenta: { type: Number, required: true },
  movedAt: { type: Date, default: Date.now }, // Fecha en que se movió el producto
});

export default mongoose.models.ExpiredProduct || mongoose.model('ExpiredProduct', ExpiredProductSchema);
