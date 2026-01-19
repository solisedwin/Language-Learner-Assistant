import express  from 'express';
import cors from 'cors';
import OpenAIRouter from './routes/OpenAIRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use('/OpenAI', OpenAIRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

