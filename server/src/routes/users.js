const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sign } = require('../utils/jwt');

// Helpers
function buildAuthResponse(user, token) {
  return {
    ...user.toClient(),
    accessToken: token,
  };
}

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, username } = req.body || {};
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, passwordHash });

    const token = await sign({ _id: user._id.toString(), email: user.email, username: user.username });
    res.status(201).json(buildAuthResponse(user, token));
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ message: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(403).json({ message: 'Invalid email or password' });

    const token = await sign({ _id: user._id.toString(), email: user.email, username: user.username });
    res.json(buildAuthResponse(user, token));
  } catch (err) {
    next(err);
  }
});

// SoftUni-style logout: just respond; token stays client-side
router.get('/logout', async (req, res) => {
  res.status(204).end();
});

module.exports = router;

