import helmet from 'helmet';
import './envconfig.ts';
import express  from 'express';
import cors from 'cors';
import ConversationRouter from './routes/ConversationRoutes.ts'

const app = express();
app.use(express.json());
app.use(helmet());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use('/api/converse', ConversationRouter);

app.listen(3000, () => {
  console.log('### Server is running on http://localhost:3000');
});

