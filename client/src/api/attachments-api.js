import * as requester from './requester';
import { API_URL } from '../config';

const base = `${API_URL}`;

export const list = (tradeId, options) => requester.get(`${base}/data/trades/${tradeId}/attachments`, options);

export const upload = (tradeId, file, options) => {
  const form = new FormData();
  form.append('file', file);
  return requester.post(`${base}/data/trades/${tradeId}/attachments`, form, options);
};

export const remove = (tradeId, attId, options) => requester.del(`${base}/data/trades/${tradeId}/attachments/${attId}`, options);

