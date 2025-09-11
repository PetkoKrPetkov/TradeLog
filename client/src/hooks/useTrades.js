import { useEffect, useState } from 'react';
import * as tradesAPI from '../api/trades-api';
import { useParams } from 'react-router-dom';

export function useGetAllTrades() {

    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const result = await tradesAPI.getAll({ signal: controller.signal });
                setTrades(result);
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Error fetching trades:', error);
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    return [trades, setTrades, loading, setLoading];

}

export function useGetLatestTrades() {

    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                if (tradesAPI.getPaged) {
                    const result = await tradesAPI.getPaged({ offset: 0, pageSize: 6, sortBy: '_createdOn desc' }, { signal: controller.signal });
                    setTrades(result);
                } else {
                    const result = await tradesAPI.getLatest({ signal: controller.signal });
                    setTrades(result);
                }
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Error fetching trades:', error);
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    return [trades, setTrades, loading, setLoading];

}

export function useGetOneTrade() {
    const [trade, setTrade] = useState({
        ticker: '',
        date: '',
        trade_direction: '',
        entry: '',
        exit: '',
        volume: '',
        support: '',
        ma: '',
        price_action: '',
        oscilators: '',
    });
    const [loading, setLoading] = useState(true);
    const { tradeId } = useParams();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const result = await tradesAPI.getOne(tradeId, { signal: controller.signal });
                setTrade(result);
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Error fetching trades:', error);
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, [tradeId]);

    return [trade, setTrade, loading, setLoading]
}

export function useCreateTrade() {
    const tradeCreateHandler = (tradeData) => tradesAPI.create(tradeData);

    return tradeCreateHandler;
}

export function useGetByOwner(ownerId) {

    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const result = await tradesAPI.getByOwner(ownerId, { signal: controller.signal });
                setTrades(result);
            } catch (error) {
                if (error?.name !== 'AbortError') {
                    console.error('Error fetching trades:', error);
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, [ownerId]);

    return [trades, setTrades, loading, setLoading];

}
