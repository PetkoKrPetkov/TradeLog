import * as request from './requester';
import { API_URL } from '../config';

const BASE_URL = `${API_URL}/data/trades`;

export const getAll = (options) => request.get(BASE_URL, options);

export const getLatest = (options) => request.get(`${BASE_URL}/?sortBy=_createdOn%20desc&pageSize=3`, options);

export const getOne = (tradeId, options) => request.get(`${BASE_URL}/${tradeId}`, options);

export const create = (tradeData, options) => request.post(`${BASE_URL}`, tradeData, options);

export const remove = (tradeId, options) => request.del(`${BASE_URL}/${tradeId}`, options);

export const update = (tradeId, tradeData, options) => request.put(`${BASE_URL}/${tradeId}`, tradeData, options);

export const getByOwner = (ownerId, options) => request.get(`${BASE_URL}?where=_ownerId%3D%22${ownerId}%22`, options);

export const getPaged = ({ offset = 0, pageSize = 6, sortBy = '_createdOn desc' } = {}, options) => {
  const params = new URLSearchParams({
    sortBy,
    pageSize: String(pageSize),
    offset: String(offset),
  });
  return request.get(`${BASE_URL}/?${params.toString().replace('%20', ' ')}`, options);
}
