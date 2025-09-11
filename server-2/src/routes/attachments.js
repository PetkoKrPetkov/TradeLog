import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isAuth } from '../middleware/auth.js';
import { prisma } from '../prismaClient.js';
import * as attachments from '../services/attachments.js';

const router = Router();

const storage = multer.diskStorage({
  destination: async (req, _file, cb) => {
    const tradeId = req.params.id;
    const dir = path.resolve('uploads', 'trades', tradeId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    cb(null, `${ts}_${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  },
});

// GET /data/trades/:id/attachments
router.get('/trades/:id/attachments', asyncHandler(async (req, res) => {
  const list = await attachments.listByTrade(req.params.id);
  res.json(list);
}));

// POST /data/trades/:id/attachments
router.post('/trades/:id/attachments', isAuth, upload.single('file'), asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const tradeId = req.params.id;
  const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
  if (!trade) return res.status(404).json({ message: 'Trade not found' });
  if (trade.ownerId !== ownerId) return res.status(403).json({ message: 'Forbidden' });

  const created = await attachments.create(ownerId, tradeId, req.file);
  res.status(201).json(created);
}));

// DELETE /data/trades/:tradeId/attachments/:attId
router.delete('/trades/:tradeId/attachments/:attId', isAuth, asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const { tradeId, attId } = req.params;
  // fetch before delete to know file path
  const att = await prisma.attachment.findUnique({ where: { id: attId } });
  // remove db record (will validate ownership & existence)
  await attachments.remove(ownerId, tradeId, attId);

  // best-effort file removal based on stored URL
  try {
    if (att?.url) {
      const rel = att.url.replace(/^\/+/, '');
      const filePath = path.resolve(rel);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  } catch (_e) {}
  res.status(204).end();
}));

export default router;
