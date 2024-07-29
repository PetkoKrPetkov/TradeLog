import { useEffect, useState } from 'react';
import Card from "../card/Card";
import styles from './Home.module.css';
import * as tradesAPI from '../../../api/trades-api';
import Spinner from '../spinner/Spinner';

export default function Home() {
    const [latestTrades, setLatestTrades] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const result = await tradesAPI.getAll();
                setLatestTrades(result.reverse().slice(0 , 3));
            } catch (error) {
                console.error('Error fetching trades:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className={styles["flex-container"]}>
            {loading 
                ? <Spinner />
                : latestTrades.length > 0 
                    ? latestTrades.map(trade => <Card key={trade._id} {...trade}/>)
                    : <h3>No recorded trades</h3>
            }         
        </div>
    );
}


