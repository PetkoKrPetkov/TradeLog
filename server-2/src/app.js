import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import tradesRouter from './routes/trades.js';
import commentsRouter from './routes/comments.js';
import marketRouter from './routes/market.js';
import attachmentsRouter from './routes/attachments.js';
import path from 'path';
import { errorHandler } from './utils/errorHandler.js';
import { auth } from './middleware/auth.js';

const app = express();

const origins = (process.env.CLIENT_ORIGIN || '').split(',').filter(Boolean);
app.use(cors({
  origin: origins.length ? origins : true,
  allowedHeaders: ['Content-Type', 'X-Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 204,
}));

app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(auth);

app.use('/users', usersRouter);
app.use('/data/trades', tradesRouter);

app.use('/data/comments', commentsRouter);
app.use('/market', marketRouter);
// serve uploads as static files
app.use('/uploads', express.static(path.resolve('uploads')));
// attachments endpoints under /data
app.use('/data', attachmentsRouter);

app.use(errorHandler);

export default app;




