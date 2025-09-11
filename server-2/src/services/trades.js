import { prisma } from '../prismaClient.js';

function serialize(tr) {
  return {
    _id: tr.id,
    ticker: tr.ticker,
    date: tr.date,
    trade_direction: tr.trade_direction,
    entry: tr.entry,
    exit: tr.exit,
    volume: tr.volume,
    support: tr.support ?? null,
    ma: tr.ma ?? null,
    price_action: tr.price_action ?? null,
    oscilators: tr.oscilators ?? null,
    strategy: tr.strategy ?? null,
    tags: typeof tr.tags === 'string'
      ? tr.tags.split(',').map((s) => s.trim()).filter(Boolean)
      : (Array.isArray(tr.tags) ? tr.tags : []),
    _ownerId: tr.ownerId,
    _createdOn: tr.createdOn,
  };
}

export async function listAll({ desc = true, limit, skip } = {}) {
  const items = await prisma.trade.findMany({
    orderBy: { createdOn: desc ? 'desc' : 'asc' },
    take: typeof limit === 'number' ? limit : undefined,
    skip: typeof skip === 'number' ? skip : undefined,
  });
  return items.map(serialize);
}

export async function listByOwner(ownerId, { desc = true, limit, skip } = {}) {
  const items = await prisma.trade.findMany({
    where: { ownerId },
    orderBy: { createdOn: desc ? 'desc' : 'asc' },
    take: typeof limit === 'number' ? limit : undefined,
    skip: typeof skip === 'number' ? skip : undefined,
  });
  return items.map(serialize);
}

export async function getPublicById(id) {
  const tr = await prisma.trade.findUnique({ where: { id } });
  if (!tr) {
    const err = new Error('Trade not found');
    err.status = 404;
    throw err;
  }
  return serialize(tr);
}

export async function getById(ownerId, id) {
  const tr = await prisma.trade.findUnique({ where: { id } });
  if (!tr) {
    const err = new Error('Trade not found');
    err.status = 404;
    throw err;
  }
  if (tr.ownerId !== ownerId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  return serialize(tr);
}

export async function create(ownerId, data) {
  const nowSec = Math.floor(Date.now() / 1000);

  const toFloat = (v) => (v === undefined || v === null || v === '' ? null : Number(v));
  const toInt = (v) => (v === undefined || v === null || v === '' ? null : parseInt(v, 10));

  const entry = toFloat(data.entry);
  const exit = toFloat(data.exit);
  const volume = toInt(data.volume);

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dirOk = ['long', 'short', 'other'];
  const bad = (msg) => { const e = new Error(msg); e.status = 400; return e; };

  if (!data.ticker?.trim()) throw bad('Ticker is required');
  if (!data.date || !dateRegex.test(data.date)) throw bad('Date must be YYYY-MM-DD');
  if (!dirOk.includes(data.trade_direction)) throw bad('Invalid trade_direction');
  if (entry === null || Number.isNaN(entry) || entry <= 0) throw bad('Invalid entry (number > 0 required)');
  if (exit !== null && (Number.isNaN(exit) || exit < 0)) throw bad('Invalid exit (>= 0 required)');
  if (volume === null || Number.isNaN(volume) || !Number.isInteger(volume) || volume <= 0) throw bad('Invalid volume (positive integer required)');

  const tagsString = Array.isArray(data.tags)
    ? data.tags.join(',')
    : (typeof data.tags === 'string' ? data.tags : null);
  const created = await prisma.trade.create({
    data: {
      ownerId,
      createdOn: nowSec,
      ticker: data.ticker,
      date: data.date ?? new Date().toISOString().slice(0, 10),
      trade_direction: data.trade_direction,
      entry,
      exit: exit ?? 0,
      volume,
      support: data.support ?? null,
      ma: data.ma ?? null,
      price_action: data.price_action ?? null,
      oscilators: data.oscilators ?? null,
      strategy: data.strategy ?? null,
      tags: tagsString,
    },
  });

  return serialize(created);
}

export async function update(ownerId, id, data) {
  const found = await prisma.trade.findUnique({ where: { id } });
  if (!found) {
    const err = new Error('Trade not found');
    err.status = 404;
    throw err;
  }
  if (found.ownerId !== ownerId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  const toFloat = (v, fallback) => (v === undefined || v === '' ? fallback : Number(v));
  const toInt = (v, fallback) => (v === undefined || v === '' ? fallback : parseInt(v, 10));
  const updatedInput = {
    ticker: data.ticker ?? found.ticker,
    date: data.date ?? found.date,
    trade_direction: data.trade_direction ?? found.trade_direction,
    entry: toFloat(data.entry, found.entry),
    exit: toFloat(data.exit, found.exit),
    volume: toInt(data.volume, found.volume),
    support: data.support ?? found.support,
    ma: data.ma ?? found.ma,
    price_action: data.price_action ?? found.price_action,
    oscilators: data.oscilators ?? found.oscilators,
    strategy: data.strategy ?? found.strategy,
    tags: (Array.isArray(data.tags)
      ? data.tags.join(',')
      : (typeof data.tags === 'string' ? data.tags : found.tags)) ?? found.tags,
  };

  // Validate the final merged data
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dirOk = ['long', 'short', 'other'];
  const bad = (msg) => { const e = new Error(msg); e.status = 400; return e; };
  if (!updatedInput.ticker?.trim()) throw bad('Ticker is required');
  if (!updatedInput.date || !dateRegex.test(updatedInput.date)) throw bad('Date must be YYYY-MM-DD');
  if (!dirOk.includes(updatedInput.trade_direction)) throw bad('Invalid trade_direction');
  if (!Number.isFinite(updatedInput.entry) || updatedInput.entry <= 0) throw bad('Invalid entry (number > 0 required)');
  if (!Number.isFinite(updatedInput.volume) || !Number.isInteger(updatedInput.volume) || updatedInput.volume <= 0) throw bad('Invalid volume (positive integer required)');
  if (updatedInput.exit !== null && updatedInput.exit !== undefined) {
    if (!Number.isFinite(updatedInput.exit) || updatedInput.exit < 0) throw bad('Invalid exit (>= 0 required)');
  }

  const updated = await prisma.trade.update({
    where: { id },
    data: updatedInput,
  });
  return serialize(updated);
}

export async function remove(ownerId, id) {
  const found = await prisma.trade.findUnique({ where: { id } });
  if (!found) {
    const err = new Error('Trade not found');
    err.status = 404;
    throw err;
  }
  if (found.ownerId !== ownerId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }
  // Remove dependent comments first to avoid FK constraint errors
  await prisma.comment.deleteMany({ where: { tradeId: id } });
  // Best-effort: remove uploaded files
  try {
    const fs = (await import('fs')).default;
    const path = (await import('path')).default;
    const dir = path.resolve('uploads', 'trades', id);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  } catch (_e) {}
  await prisma.trade.delete({ where: { id } });
}
