import { useEffect, useState } from "react";
import commentsAPI from "../api/comments-api";

export function useCreateComment() {
    const createHandler = (tradeId, content) => commentsAPI.create(tradeId, content)
    
    return createHandler;
}

export function useGetAllComments(tradeId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!tradeId) {
            setComments([]);
            return;
        }

        let isActive = true;

        (async () => {
            try {
                const result = await commentsAPI.getAll(tradeId);

                if (isActive) {
                    setComments(result);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);

                if (isActive) {
                    setComments([]);
                }
            }
        })();

        return () => {
            isActive = false;
        };
    }, [tradeId]);

    return [comments, setComments];
}
