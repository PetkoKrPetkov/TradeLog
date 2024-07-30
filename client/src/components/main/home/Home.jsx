import { useEffect, useState } from 'react';
import Card from "../card/Card";
import styles from './Home.module.css';
import * as tradesAPI from '../../../api/trades-api';
import Spinner from '../spinner/Spinner';
import { useGetAllTrades } from '../../../hooks/useTrades';

export default function Home() {
    // const [latestTrades, setLatestTrades] = useState([])
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const result = await tradesAPI.getAll();
    //             setLatestTrades(result.reverse().slice(0, 3));
    //         } catch (error) {
    //             console.error('Error fetching trades:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     })();
    // }, []);

    const [trades, setTrades, loading, setLoading] = useGetAllTrades();

    const latestTrades = trades.reverse().slice(0,3);

    return (
        <div>
            <h2 className={styles["h2"]}>The latest 3 Trades</h2>

            <div className={styles["flex-container"]}>
                {loading
                    ? <Spinner />
                    : latestTrades.length > 0
                        ? latestTrades.map(trade => <Card key={trade._id} {...trade} />)
                        : <h3>No recorded trades</h3>
                }
            </div>
        </div>
    );
}


