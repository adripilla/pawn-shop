// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'], // Limita los valores posibles a 'user' y 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Establece automáticamente la fecha actual si no se proporciona
  },
});

// Crea el modelo 'User' o usa el existente si ya está definido
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
