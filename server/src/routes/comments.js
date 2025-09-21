const router = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const { authMiddleware, isAuth } = require('../middlewares/auth');

router.use(authMiddleware);

// Create comment
router.post('/', isAuth, async (req, res, next) => {
  try {
    const { tradeId, content } = req.body || {};
    if (!tradeId || !content) return res.status(400).json({ message: 'tradeId and content are required' });
    const created = await Comment.create({ tradeId, content, _ownerId: req.user._id });
    res.status(201).json(created.toClient());
  } catch (err) {
    next(err);
  }
});

// List comments with filtering and optional load param
router.get('/', async (req, res, next) => {
  try {
    const { where, load } = req.query;
    const query = {};
    if (where) {
      // format: tradeId="<id>"
      const m = decodeURIComponent(where).match(/^tradeId\s*=\s*\"(.+)\"$/);
      if (m) query.tradeId = m[1];
    }

    const docs = await Comment.find(query).exec();
    let items = docs.map((d) => d.toClient());

    if (load) {
      // expected: author=_ownerId:users
      const decoded = decodeURIComponent(load);
      if (decoded.startsWith('author=_ownerId:users')) {
        const userIds = [...new Set(items.map((c) => c._ownerId))];
        const users = await User.find({ _id: { $in: userIds } }).exec();
        const userMap = new Map(users.map((u) => [u._id.toString(), u.toClient()]));
        items = items.map((c) => ({ ...c, author: userMap.get(c._ownerId) || null }));
      }
    }

    res.json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

