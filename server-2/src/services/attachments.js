import { prisma } from '../prismaClient.js';

function serialize(att) {
  return {
    _id: att.id,
    tradeId: att.tradeId,
    _ownerId: att.ownerId,
    filename: att.filename,
    mime: att.mime,
    size: att.size,
    url: att.url,
    _createdOn: att.createdOn,
  };
}

export async function listByTrade(tradeId) {
  const items = await prisma.attachment.findMany({
    where: { tradeId },
    orderBy: { createdOn: 'asc' },
  });
  return items.map(serialize);
}

export async function create(ownerId, tradeId, file) {
  if (!file) {
    const e = new Error('File is required'); e.status = 400; throw e;
  }
  const now = Math.floor(Date.now() / 1000);
  const base = (process.env.PUBLIC_BASE_URL || '').replace(/\/+$/, '');
  const relUrl = `/uploads/trades/${tradeId}/${file.filename}`;
  const url = base ? `${base}${relUrl}` : relUrl;
  const created = await prisma.attachment.create({
    data: {
      ownerId,
      tradeId,
      filename: file.originalname,
      mime: file.mimetype,
      size: file.size,
      url,
      createdOn: now,
    },
  });
  return serialize(created);
}

export async function remove(ownerId, tradeId, id) {
  const att = await prisma.attachment.findUnique({ where: { id } });
  if (!att || att.tradeId !== tradeId) {
    const e = new Error('Attachment not found'); e.status = 404; throw e;
  }
  const trade = await prisma.trade.findUnique({ where: { id: tradeId } });
  if (!trade || trade.ownerId !== ownerId) {
    const e = new Error('Forbidden'); e.status = 403; throw e;
  }
  await prisma.attachment.delete({ where: { id } });
  // File cleanup is handled in route layer (best effort)
}
