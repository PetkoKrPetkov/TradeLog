import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as users from '../services/users.js';

const router = Router();

// POST /users/register
router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, username } = req.body || {};
  const result = await users.register({ email, password, username });
  res.status(201).json(result);
}));

// POST /users/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  const result = await users.login({ email, password });
  res.status(200).json(result);
}));

// GET /users/logout
router.get('/logout', (_req, res) => {
  res.status(204).end();
});

export default router;
