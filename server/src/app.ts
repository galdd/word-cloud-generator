import express from 'express';
import wordCloudRouter from './word-cloud/routes';

const app = express();

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/word-cloud', wordCloudRouter);

export default app;
