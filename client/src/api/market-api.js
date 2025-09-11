import { API_URL } from '../config';
import * as requester from './requester';

const BASE = `${API_URL}/market`;

export const getQuotes = (symbols) => {
  const params = symbols && symbols.length ? `?symbols=${symbols.join(',')}` : '';
  return requester.get(`${BASE}/quotes${params}`);
};

export const getChart = (symbol) => {
  const params = `?symbol=${encodeURIComponent(symbol)}`;
  return requester.get(`${BASE}/chart${params}`);
};
