import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient.js';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

function createToken(user) {
  return jwt.sign(
    { _id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '2d' }
  );
}

export async function register({ email, password, username }) {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const finalUsername = username?.trim() || email.split('@')[0];

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error('Email already exists');
    err.status = 409;
    throw err;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hash, username: finalUsername },
  });

  const accessToken = createToken(user);
  return { accessToken, _id: user.id, email: user.email, username: user.username };
}

export async function login({ email, password }) {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const accessToken = createToken(user);
  return { accessToken, _id: user.id, email: user.email, username: user.username };
}

