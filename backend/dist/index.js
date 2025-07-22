"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const event_1 = __importDefault(require("./routes/event"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/event', event_1.default);
app.use('/events', event_1.default); // GET /events
const PORT = process.env.PORT || 3000;
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
});
