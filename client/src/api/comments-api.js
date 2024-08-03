import * as requester from './requester'

const BASE_URL = 'http://localhost:3030/data/comments';

const create = (tradeId, content) => requester.post(BASE_URL, { tradeId, content});

const getAll = (tradeId) => {
    const params = new URLSearchParams({
        where: `tradeId="${tradeId}"`
    });

    const commentsArr = requester.get(`${BASE_URL}?${params.toString()}`);
    return commentsArr;
}

const commentsAPI = {
    create,
    getAll,
}

export default commentsAPI;