import express  from 'express';
import cors from 'cors';
import OpenAIRouter from './routes/OpenAIRoutes.ts';
import dotenv from 'dotenv';

console.log('lsflksjdklsjdlsjdsljfldsjfdlkfjdlskjfkld lafft taffy');

dotenv.config();
//console.log(process.env);

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use('/OpenAI', OpenAIRouter);

app.listen(3000, () => {
  console.log('** Server is running on http://localhost:3000');
});

