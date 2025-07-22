import { Request, Response } from 'express';
import crypto from 'crypto';
import Event from '../models/Event';
import { sendHashToBlockchain } from '../services/blockchain';

const validateEvent = (data: any) => {
  const { placa, tipo, local } = data;
  if (!placa || typeof placa !== 'string') return 'Placa obrigatória';
  if (!['entrada', 'saida'].includes(tipo)) return 'Tipo inválido';
  if (!local || typeof local !== 'string') return 'Local obrigatório';
  return null;
};

export const createEvent = async (req: Request, res: Response) => {
  const { placa, tipo, local, timestamp } = req.body;
  const error = validateEvent(req.body);
  if (error) return res.status(400).json({ error });

  const eventTimestamp = timestamp ? new Date(timestamp) : new Date();
  const eventData = { placa, tipo, local, timestamp: eventTimestamp };
  const hash = crypto.createHash('sha256').update(JSON.stringify(eventData)).digest('hex');

  try {
    const event = new Event({ ...eventData, hash });
    await event.save();
    try {
      await sendHashToBlockchain(hash);
    } catch (blockchainErr) {
      console.error('Blockchain Go offline:', blockchainErr);
      // Não impede o registro, apenas loga
    }
    return res.status(201).json(event);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao salvar evento' });
  }
};

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 });
    return res.json(events);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
}; 