import express from 'express';
import cors from 'cors'; // Importe o cors
import dotenv from 'dotenv';
import ticketRoutes from './routes/tickets';

dotenv.config();
const app = express();

app.use(cors()); // Ative o cors antes de qualquer outra coisa
app.use(express.json());
app.use('/tickets', ticketRoutes);

app.listen(3333, () => console.log("🚀 Backend operando na 3333"));