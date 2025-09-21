const { verify } = require('../utils/jwt');

async function authMiddleware(req, res, next) {
  const token = req.headers['x-authorization'] || '';
  if (!token) return next();
  try {
    const decoded = await verify(token);
    req.user = decoded;
  } catch (err) {
    // Invalid token; ignore to allow public endpoints
  }
  next();
}

function isAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  next();
}

function isOwner(getOwnerId) {
  return (req, res, next) => {
    const ownerId = getOwnerId(req);
    if (!req.user || req.user._id !== ownerId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

module.exports = { authMiddleware, isAuth, isOwner };

