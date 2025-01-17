import { useEffect, useState } from 'react';
import * as tradesAPI from '../api/trades-api';
import { useParams } from 'react-router-dom';

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

export function useGetLatestTrades() {

    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await tradesAPI.getLatest();
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
        (async () => {
            try {
                const result = await tradesAPI.getOne(tradeId);
                setTrade(result);
            } catch (error) {
                console.error('Error fetching trades:', error);
            } finally {
                setLoading(false);
            }
        })();
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
        (async () => {
            try {
                const result = await tradesAPI.getByOwner(ownerId);
                setTrades(result);
            } catch (error) {
                console.error('Error fetching trades:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [ownerId]);

    return [trades, setTrades, loading, setLoading];

}