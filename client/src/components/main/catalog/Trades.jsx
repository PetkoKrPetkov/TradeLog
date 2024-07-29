import { useEffect, useState } from 'react';
import * as tradesAPI from '../../../api/trades-api';

import Card from "../card/Card";
import styles from './Trades.module.css';
import Spinner from '../spinner/Spinner';

export default function Trades() {
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

    return (
        <div>
            <h2 className={styles["h2"]}>All Trades</h2>
            <div className={styles["flex-container"]}>
                {loading
                    ? <Spinner />
                    : trades.length > 0
                        ? trades.map(trade => <Card key={trade._id} {...trade} />)
                        : <h3>No recorded trades</h3>
                }
            </div>
        </div>
    );
}