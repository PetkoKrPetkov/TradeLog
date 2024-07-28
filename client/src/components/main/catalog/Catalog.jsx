import { useEffect, useState } from 'react';
import * as tradesAPI from '../../../api/trades-api';

import Card from "../card/Card";
import styles from './Catalog.module.css';

export default function Catalog() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        tradesAPI.getAll()
            .then(result => setTrades(result));
            
    }, []);

    return (
        <div className={styles["flex-container"]}>
            {trades.map(trade => <Card key={trade._id} {...trade}/>)}
        </div>
    );
}