import * as requester from './requester'
import { API_URL } from '../config';

const BASE_URL = `${API_URL}/data/comments`;

const create = (tradeId, content, options) => requester.post(BASE_URL, { tradeId, content }, options);

const getAll = (tradeId, options) => {
    const params = new URLSearchParams({
        where: `tradeId=\"${tradeId}\"`,
        load: `author=_ownerId:users`,
    });

    const commentsArr = requester.get(`${BASE_URL}?${params.toString()}`, options);
    return commentsArr;
}

const commentsAPI = {
    create,
    getAll,
}

export default commentsAPI;

