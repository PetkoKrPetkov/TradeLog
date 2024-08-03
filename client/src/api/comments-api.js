import * as requester from './requester'

const BASE_URL = 'http://localhost:3030/data/comments';

const create = async (tradeId, content) => requester.post(BASE_URL, { tradeId, content});

const getAll = async (tradeId) => {
    const commentsArr = await requester.get(BASE_URL);
    console.log(commentsArr);
}

const commentsAPI = {
    create,
    getAll,
}

export default commentsAPI;