import { useEffect, useState } from 'react';
import * as tradesAPI from '../../../api/trades-api';

import Card from "../card/Card";
import styles from './Catalog.module.css';
import Spinner from '../spinner/Spinner';

export default function Catalog() {
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tradesAPI.getAll()
            .then(result => {
                setTrades(result);
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles["flex-container"]}>
            {loading 
                ? <Spinner />
                : trades.length > 0 
                    ? trades.map(trade => <Card key={trade._id} {...trade}/>)
                    : <h3>No recorded trades</h3>
            }         
        </div>
    );
}