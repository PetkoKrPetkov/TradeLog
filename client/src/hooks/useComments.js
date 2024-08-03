import commentsAPI from "../api/comments-api";

export default function useCreateComment() {
    const createHandler = (tradeId, content) => commentsAPI.create(tradeId, content)
    
    return createHandler;
}