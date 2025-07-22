import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRoutes from './routes/event';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/event', eventRoutes);
app.use('/events', eventRoutes); // GET /events

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
  }); 