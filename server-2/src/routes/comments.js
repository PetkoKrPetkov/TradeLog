import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isAuth } from '../middleware/auth.js';
import * as comments from '../services/comments.js';

const router = Router();

// GET /data/comments?where=tradeId%3D%22<id>%22&load=author=_ownerId:users
router.get('/', asyncHandler(async (req, res) => {
  const { where, load } = req.query || {};

  let tradeId;
  if (typeof where === 'string') {
    const m = decodeURIComponent(where).match(/tradeId\s*=\s*"([^"]+)"/);
    if (m) tradeId = m[1];
  }

  const includeAuthor = typeof load === 'string' && /author=_ownerId:users/i.test(load);

  if (!tradeId) {
    // For our app, comments listing without tradeId is not used; return empty list
    return res.json([]);
  }

  const list = await comments.listByTrade(tradeId, { includeAuthor });
  res.json(list);
}));

// POST /data/comments { tradeId, content }
router.post('/', isAuth, asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const created = await comments.create(ownerId, req.body || {});
  res.status(201).json(created);
}));

export default router;

