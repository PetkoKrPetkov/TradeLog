import { prisma } from '../prismaClient.js';

function serialize(cmt) {
  return {
    _id: cmt.id,
    tradeId: cmt.tradeId,
    content: cmt.content,
    _ownerId: cmt.ownerId,
    _createdOn: cmt.createdOn,
  };
}

export async function listByTrade(tradeId, { includeAuthor = false } = {}) {
  const comments = await prisma.comment.findMany({
    where: { tradeId },
    orderBy: { createdOn: 'asc' },
    include: includeAuthor ? { author: true } : undefined,
  });

  if (includeAuthor) {
    return comments.map((c) => ({
      ...serialize(c),
      author: c.author ? { username: c.author.username } : undefined,
    }));
  }
  return comments.map(serialize);
}

export async function create(ownerId, { tradeId, content }) {
  if (!tradeId || !content?.trim()) {
    const err = new Error('tradeId and content are required');
    err.status = 400;
    throw err;
  }

  const nowSec = Math.floor(Date.now() / 1000);

  // Ensure trade exists
  const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
  if (!trade) {
    const err = new Error('Trade not found');
    err.status = 404;
    throw err;
  }

  const created = await prisma.comment.create({
    data: {
      tradeId,
      ownerId,
      content: content.trim(),
      createdOn: nowSec,
    },
  });

  return serialize(created);
}

