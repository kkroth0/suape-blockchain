import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  placa: { type: String, required: true },
  tipo: { type: String, enum: ['entrada', 'saida'], required: true },
  local: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  hash: { type: String, required: true }
});

export default model('Event', eventSchema); 