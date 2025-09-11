import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isAuth } from '../middleware/auth.js';
import * as trades from '../services/trades.js';

const router = Router();

// GET /data/trades
// Supports optional query params used by the client:
// - where=_ownerId%3D%22<id>%22  (URL encoded)
// - sortBy=_createdOn%20desc
// - pageSize=3
router.get('/', asyncHandler(async (req, res) => {
  const { where, sortBy, pageSize, offset, skip } = req.query || {};

  // Default sorting: createdOn desc (accept both space and '+' separators)
  let desc = true;
  if (typeof sortBy === 'string') {
    const s = decodeURIComponent(String(sortBy)).replace(/\+/g, ' ');
    desc = /_createdOn\s+desc/i.test(s);
  }
  const limit = pageSize !== undefined ? Number(pageSize) : undefined;
  const _skip = (offset !== undefined ? Number(offset) : (skip !== undefined ? Number(skip) : undefined));

  // Optional owner filter (where=_ownerId="id")
  let ownerId;
  if (typeof where === 'string') {
    const m = decodeURIComponent(where).match(/_ownerId\s*=\s*"([^"]+)"/);
    if (m) ownerId = m[1];
  }

  let data;
  if (ownerId) {
    data = await trades.listByOwner(ownerId, { desc, limit, skip: _skip });
  } else {
    data = await trades.listAll({ desc, limit, skip: _skip });
  }
  res.json(data);
}));

// Public details endpoint (used on public Details page)
router.get('/:id', asyncHandler(async (req, res) => {
  const item = await trades.getPublicById(req.params.id);
  res.json(item);
}));

router.post('/', isAuth, asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const created = await trades.create(ownerId, req.body || {});
  res.status(201).json(created);
}));

router.put('/:id', isAuth, asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const updated = await trades.update(ownerId, req.params.id, req.body || {});
  res.json(updated);
}));

router.delete('/:id', isAuth, asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  await trades.remove(ownerId, req.params.id);
  res.status(204).end();
}));

export default router;
