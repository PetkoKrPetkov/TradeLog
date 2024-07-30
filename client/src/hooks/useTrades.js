import { useEffect, useState } from 'react';
import * as tradesAPI from '../api/trades-api';

export function useGetAllTrades() {

    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await tradesAPI.getAll();
                setTrades(result);
            } catch (error) {
                console.error('Error fetching trades:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return [trades, setTrades, loading, setLoading];

}
