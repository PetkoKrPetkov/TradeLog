import React, { useMemo, useState } from 'react';
import styles from './Profile.module.css';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useGetByOwner } from '../../../hooks/useTrades';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';
import { formatDateISO, formatInteger, formatMaybeNumber } from '../../../utils/format';
import PageHeader from '../../common/page-header/PageHeader';

export default function Profile() {
    const { email, username, userId } = useAuthContext();
    const [trades, , loading] = useGetByOwner(userId);

    const [direction, setDirection] = useState(localStorage.getItem('profile_dir') || '');
    const [tagQuery, setTagQuery] = useState(localStorage.getItem('profile_tag') || '');
    const [sortBy, setSortBy] = useState(localStorage.getItem('profile_sort') || 'newest');

    const stats = useMemo(() => {
        const total = trades.length;
        const long = trades.filter(t => t.trade_direction === 'long').length;
        const short = trades.filter(t => t.trade_direction === 'short').length;
        const other = trades.filter(t => t.trade_direction === 'other').length;
        const totalVolume = trades.reduce((s, t) => s + (Number(t.volume) || 0), 0);
        const tagSet = new Set();
        trades.forEach(t => Array.isArray(t.tags) && t.tags.forEach(tag => tagSet.add(tag)));
        return { total, long, short, other, totalVolume, tagsCount: tagSet.size };
    }, [trades]);

    const filteredSorted = useMemo(() => {
        let list = trades;
        if (direction) list = list.filter(t => t.trade_direction === direction);
        if (tagQuery) list = list.filter(t => Array.isArray(t.tags) && t.tags.some(tag => tag.toLowerCase().includes(tagQuery.toLowerCase())));
        switch (sortBy) {
            case 'oldest':
                return [...list].sort((a, b) => (a._createdOn || 0) - (b._createdOn || 0));
            case 'volume':
                return [...list].sort((a, b) => (Number(b.volume)||0) - (Number(a.volume)||0));
            default:
                return [...list].sort((a, b) => (b._createdOn || 0) - (a._createdOn || 0));
        }
    }, [trades, direction, tagQuery, sortBy]);

    return (
        <div className={styles.profileContainer}>
            <PageHeader title="Profile" breadcrumbs={[{label:'Home', to:'/'},{label:'Profile'}]} />
            <div className={styles.headerRow}>
                <div className={styles.avatar}>{(username||'U').slice(0,1).toUpperCase()}</div>
                <div>
                    <h2 className={styles.title}>{username}</h2>
                    <p className={styles.subtitle}>{email}</p>
                </div>
            </div>

            <div className={styles.statsBar}>
                <div className={styles.stat}><span className={styles.statNumber}>{stats.total}</span><span className={styles.statLabel}>Trades</span></div>
                <div className={styles.stat}><span className={styles.statNumber}>{stats.long}</span><span className={styles.statLabel}>Long</span></div>
                <div className={styles.stat}><span className={styles.statNumber}>{stats.short}</span><span className={styles.statLabel}>Short</span></div>
                <div className={styles.stat}><span className={styles.statNumber}>{stats.tagsCount}</span><span className={styles.statLabel}>Tags</span></div>
                <div className={styles.stat}><span className={styles.statNumber}>{stats.totalVolume}</span><span className={styles.statLabel}>Total Volume</span></div>
            </div>

            <div className={styles.controls}>
                <div className={styles.chips}>
                    <button className={`${styles.chip} ${direction===''?styles.chipActive:''}`} onClick={()=>{ setDirection(''); localStorage.setItem('profile_dir',''); }}>All</button>
                    <button className={`${styles.chip} ${direction==='long'?styles.chipActive:''}`} onClick={()=>{ setDirection('long'); localStorage.setItem('profile_dir','long'); }}>Long</button>
                    <button className={`${styles.chip} ${direction==='short'?styles.chipActive:''}`} onClick={()=>{ setDirection('short'); localStorage.setItem('profile_dir','short'); }}>Short</button>
                    <button className={`${styles.chip} ${direction==='other'?styles.chipActive:''}`} onClick={()=>{ setDirection('other'); localStorage.setItem('profile_dir','other'); }}>Other</button>
                </div>
                <div className={styles.filtersRight}>
                    <input className={styles.tagInput} placeholder="Filter by tag" value={tagQuery} onChange={(e)=> { setTagQuery(e.target.value); localStorage.setItem('profile_tag', e.target.value); }} />
                    <select className={styles.sortSelect} value={sortBy} onChange={(e)=>{ setSortBy(e.target.value); localStorage.setItem('profile_sort', e.target.value); }}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="volume">Volume</option>
                    </select>
                </div>
            </div>

            <div className={styles.tradesSection}>
                <h3 className={styles.tradesTitle}>Your Trades</h3>
                {loading ? (
                    <Spinner />
                ) : (
                    filteredSorted.length > 0 ? (
                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Ticker</th>
                                        <th>Dir</th>
                                        <th>Entry</th>
                                        <th>Exit</th>
                                        <th>Volume</th>
                                        <th>Strategy</th>
                                        <th>Tags</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSorted.map((t) => (
                                        <tr key={t._id}>
                                            <td>{formatDateISO(t.date)}</td>
                                            <td className={styles.ticker}>{t.ticker}</td>
                                            <td>
                                                <span className={
                                                    t.trade_direction === 'long' ? `${styles.badge} ${styles.badgeLong}` :
                                                    t.trade_direction === 'short' ? `${styles.badge} ${styles.badgeShort}` :
                                                    `${styles.badge} ${styles.badgeOther}`
                                                }>
                                                    {t.trade_direction}
                                                </span>
                                            </td>
                                            <td className={styles.numRight}>{formatMaybeNumber(t.entry)}</td>
                                            <td className={styles.numRight}>{formatMaybeNumber(t.exit)}</td>
                                            <td className={styles.numRight}>{formatInteger(t.volume)}</td>
                                            <td>{t.strategy || '-'}</td>
                                            <td className={styles.tagsCell}>{Array.isArray(t.tags) && t.tags.length ? t.tags.join(', ') : '-'}</td>
                                            <td className={styles.actionsCell}>
                                                <Link className={styles.smallLink} to={`/trades/${t._id}/details`}>Details</Link>
                                                <Link className={styles.smallLink} to={`/trades/${t._id}/edit`}>Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <p className={styles.noTrades}>No recorded trades</p>
                            <Link to="/create-trade" className={styles.actionButton}>Create Trade</Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}


