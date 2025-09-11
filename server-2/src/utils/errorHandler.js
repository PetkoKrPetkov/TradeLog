export function errorHandler(err, _req, res, _next) {
  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'Email already exists' });
  }
  if (err.code === 'P2003') {
    return res.status(409).json({ message: 'Related records prevent this operation' });
  }

  if (err.status && err.message) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.message === 'Invalid credentials') {
    return res.status(401).json({ message: err.message });
  }
  if (err.message === 'Email already exists') {
    return res.status(409).json({ message: err.message });
  }

  console.error('[ERROR]', err);
  return res.status(500).json({ message: 'Server error' });
}
