import { useEffect, useState } from "react";
import commentsAPI from "../api/comments-api";

export function useCreateComment() {
    const createHandler = (tradeId, content) => commentsAPI.create(tradeId, content)
    
    return createHandler;
}

export function useGetAllComments(tradeId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(tradeId);

            setComments(result);
        })();
    }, [tradeId]);

    return [comments, setComments];
}