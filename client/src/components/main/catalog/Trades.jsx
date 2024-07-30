import { useGetAllTrades } from '../../../hooks/useTrades';

import Card from "../card/Card";
import styles from './Trades.module.css';
import Spinner from '../spinner/Spinner';

export default function Trades() {
    const [trades, setTrades, loading, setLoading] = useGetAllTrades()
    
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