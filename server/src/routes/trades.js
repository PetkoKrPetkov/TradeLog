const router = require('express').Router();
const Trade = require('../models/Trade');
const { authMiddleware, isAuth } = require('../middlewares/auth');

router.use(authMiddleware);

function applyDerivedFields(target) {
  if (!target) return target;

  if (!target.title && target.ticker) {
    target.title = target.ticker;
  }

  if (target.entry !== undefined) {
    const entry = Number(target.entry);
    if (!Number.isNaN(entry)) {
      target.entry = entry;
    }
  }

  if (target.exit !== undefined) {
    const exit = Number(target.exit);
    if (!Number.isNaN(exit)) {
      target.exit = exit;
    }
  }

  if (target.entry !== undefined && target.exit !== undefined) {
    const entry = Number(target.entry);
    const exit = Number(target.exit);
    if (!Number.isNaN(entry) && !Number.isNaN(exit)) {
      target.profitLoss = Number((exit - entry).toFixed(2));
    }
  }

  if (target.volume !== undefined) {
    const volume = Number(target.volume);
    if (!Number.isNaN(volume)) {
      target.volume = volume;
    }
  }

  return target;
}

// List trades with optional sorting and filtering
router.get('/', async (req, res, next) => {
  try {
    const { sortBy, pageSize, where } = req.query;
    let query = {};
    if (where) {
      // Expected format: _ownerId="<id>"
      const m = decodeURIComponent(where).match(/^_ownerId\s*=\s*\"(.+)\"$/);
      if (m) query._ownerId = m[1];
    }

    let q = Trade.find(query);

    if (sortBy) {
      // Expected: _createdOn desc
      const decoded = decodeURIComponent(sortBy);
      const [field, dir] = decoded.split(/\s+/);
      const map = field === '_createdOn' ? 'createdAt' : field;
      q = q.sort({ [map]: dir?.toLowerCase() === 'desc' ? -1 : 1 });
    }

    if (pageSize) {
      q = q.limit(Number(pageSize));
    }

    const items = await q.exec();
    res.json(items.map((t) => t.toClient()));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const doc = await Trade.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc.toClient());
  } catch (err) {
    next(err);
  }
});

router.post('/', isAuth, async (req, res, next) => {
  try {
    const data = applyDerivedFields({ ...(req.body || {}) });
    data._ownerId = req.user._id;
    if (!data.date) {
      data.date = new Date().toISOString().slice(0, 10);
    }
    const created = await Trade.create(data);
    res.status(201).json(created.toClient());
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isAuth, async (req, res, next) => {
  try {
    const doc = await Trade.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    if (doc._ownerId.toString() !== req.user._id) return res.status(403).json({ message: 'Forbidden' });

    applyDerivedFields(Object.assign(doc, req.body || {}));
    await doc.save();
    res.json(doc.toClient());
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isAuth, async (req, res, next) => {
  try {
    const doc = await Trade.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    if (doc._ownerId.toString() !== req.user._id) return res.status(403).json({ message: 'Forbidden' });

    await doc.deleteOne();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

