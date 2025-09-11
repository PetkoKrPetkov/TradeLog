import { useEffect, useMemo, useState } from 'react';
import * as tradesAPI from '../../../api/trades-api';
import Card from "../card/Card";
import styles from './Trades.module.css';
import Spinner from '../spinner/Spinner';
import SkeletonCard from '../../common/skeleton/SkeletonCard';
import { Link } from 'react-router-dom';
import PageHeader from '../../common/page-header/PageHeader';

export default function Trades() {
    const PAGE_SIZE = 6;
    const [trades, setTrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [direction, setDirection] = useState(localStorage.getItem('dir') || '');
    const [tagQuery, setTagQuery] = useState(localStorage.getItem('tag') || '');

    const filtered = useMemo(() => {
        let list = trades;
        if (direction) list = list.filter(t => t.trade_direction === direction);
        if (tagQuery) list = list.filter(t => Array.isArray(t.tags) && t.tags.some(tag => tag.toLowerCase().includes(tagQuery.toLowerCase())));
        return list;
    }, [trades, direction, tagQuery]);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                setLoading(true);
                const result = await tradesAPI.getPaged({ offset: 0, pageSize: PAGE_SIZE, sortBy: '_createdOn desc' });
                if (!active) return;
                setTrades(result);
                setOffset(result.length);
                setHasMore(result.length === PAGE_SIZE);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false };
    }, []);

    const loadMore = async () => {
        try {
            setLoadingMore(true);
            const result = await tradesAPI.getPaged({ offset, pageSize: PAGE_SIZE, sortBy: '_createdOn desc' });
            setTrades(prev => [...prev, ...result]);
            setOffset(offset + result.length);
            setHasMore(result.length === PAGE_SIZE);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <div>
            <PageHeader title="All Trades" breadcrumbs={[{label:'Home', to:'/'},{label:'Trades'}]} />
            <div className={styles.filters}>
                <button className={`${styles.chip} ${direction===''?styles.chipActive:''}`} onClick={()=>{ setDirection(''); localStorage.setItem('dir',''); }}>All</button>
                <button className={`${styles.chip} ${direction==='long'?styles.chipActive:''}`} onClick={()=>{ setDirection('long'); localStorage.setItem('dir','long'); }}>Long</button>
                <button className={`${styles.chip} ${direction==='short'?styles.chipActive:''}`} onClick={()=>{ setDirection('short'); localStorage.setItem('dir','short'); }}>Short</button>
                <button className={`${styles.chip} ${direction==='other'?styles.chipActive:''}`} onClick={()=>{ setDirection('other'); localStorage.setItem('dir','other'); }}>Other</button>
                <input className={styles.tagInput} placeholder="Filter by tag" value={tagQuery} onChange={(e)=> { setTagQuery(e.target.value); localStorage.setItem('tag', e.target.value); }} />
            </div>
            <div className={styles["flex-container"]}>
                {loading
                    ? (
                        Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                      )
                    : filtered.length > 0
                        ? filtered.map(trade => <Card key={trade._id} {...trade} />)
                        : (
                            <div>
                              <h3>No recorded trades</h3>
                              <Link to="/create-trade" className={styles["cta-link"]}>Create Trade</Link>
                            </div>
                          )
                }
            </div>
            {!loading && hasMore && (
                <div style={{ display:'flex', justifyContent:'center', paddingBottom:'1rem' }}>
                    <button onClick={loadMore} disabled={loadingMore} className={styles["cta-link"]}>
                        {loadingMore ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
}
