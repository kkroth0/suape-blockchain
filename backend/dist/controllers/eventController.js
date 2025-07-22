"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.createEvent = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Event_1 = __importDefault(require("../models/Event"));
const blockchain_1 = require("../services/blockchain");
const validateEvent = (data) => {
    const { placa, tipo, local } = data;
    if (!placa || typeof placa !== 'string')
        return 'Placa obrigatória';
    if (!['entrada', 'saida'].includes(tipo))
        return 'Tipo inválido';
    if (!local || typeof local !== 'string')
        return 'Local obrigatório';
    return null;
};
const createEvent = async (req, res) => {
    const { placa, tipo, local, timestamp } = req.body;
    const error = validateEvent(req.body);
    if (error)
        return res.status(400).json({ error });
    const eventTimestamp = timestamp ? new Date(timestamp) : new Date();
    const eventData = { placa, tipo, local, timestamp: eventTimestamp };
    const hash = crypto_1.default.createHash('sha256').update(JSON.stringify(eventData)).digest('hex');
    try {
        const event = new Event_1.default({ ...eventData, hash });
        await event.save();
        try {
            await (0, blockchain_1.sendHashToBlockchain)(hash);
        }
        catch (blockchainErr) {
            console.error('Blockchain Go offline:', blockchainErr);
            // Não impede o registro, apenas loga
        }
        return res.status(201).json(event);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao salvar evento' });
    }
};
exports.createEvent = createEvent;
const getEvents = async (_req, res) => {
    try {
        const events = await Event_1.default.find().sort({ timestamp: -1 });
        return res.json(events);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
};
exports.getEvents = getEvents;
