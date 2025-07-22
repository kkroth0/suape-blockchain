"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    placa: { type: String, required: true },
    tipo: { type: String, enum: ['entrada', 'saida'], required: true },
    local: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    hash: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Event', eventSchema);
