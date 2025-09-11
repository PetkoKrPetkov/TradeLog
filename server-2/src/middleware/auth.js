import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export function auth(req, _res, next) {
  const token = req.headers['x-authorization'];
  if (!token) return next();

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (_e) {
    return next({ status: 401, message: 'Invalid token' });
  }
}

export function isAuth(req, _res, next) {
  if (!req.user?._id) {
    return next({ status: 401, message: 'Unauthorized' });
  }
  next();
}
