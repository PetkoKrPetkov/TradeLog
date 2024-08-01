import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/trades';

export const getAll = () => request.get(BASE_URL);

export const getOne = (tradeId) => request.get(`${BASE_URL}/${tradeId}`);

export const create = (tradeData) => request.post(`${BASE_URL}`, tradeData);