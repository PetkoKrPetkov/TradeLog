import { useEffect, useState } from "react";
import commentsAPI from "../api/comments-api";

export function useCreateComment() {
    const createHandler = (tradeId, content) => commentsAPI.create(tradeId, content)
    
    return createHandler;
}

export function useGetAllComments(tradeId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const result = await commentsAPI.getAll(tradeId, { signal: controller.signal });
                setComments(result);
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Error fetching comments:', error);
                    setComments([]);
                }
            }
        })();
        return () => controller.abort();
    }, [tradeId]);

    return [comments, setComments];
}
