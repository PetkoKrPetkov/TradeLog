
import Card from "../card/Card";
import styles from './Home.module.css';
import Spinner from '../spinner/Spinner';
import { useGetLatestTrades } from '../../../hooks/useTrades';

export default function Home() {

    const [trades, setTrades, loading, setLoading] = useGetLatestTrades();

    const latestTrades = trades;

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


