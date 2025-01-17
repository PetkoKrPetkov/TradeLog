import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/trades';

export const getAll = () => request.get(BASE_URL);

export const getLatest = () => request.get(`${BASE_URL}/?sortBy=_createdOn%20desc&pageSize=3`);

export const getOne = (tradeId) => request.get(`${BASE_URL}/${tradeId}`);

export const create = (tradeData) => request.post(`${BASE_URL}`, tradeData);

export const remove = (tradeId) => request.del(`${BASE_URL}/${tradeId}`);

export const update = (tradeId, tradeData) => request.put(`${BASE_URL}/${tradeId}`, tradeData);

export const getByOwner = ( ownerId ) => request.get(`${BASE_URL}?where=_ownerId%3D%22${ownerId}%22`);