import { Router } from 'express';
import { generateWordCloud } from './service';

const router = Router();

// GET /api/word-cloud?text=...
router.get('/', (req, res) => {
  const text = String(req.query.text ?? '');
  const result = generateWordCloud(text);
  res.json(result);
});

export default router;
