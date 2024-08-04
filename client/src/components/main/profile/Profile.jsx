import React from 'react';
import styles from './Profile.module.css';
import Card from '../card/Card';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useGetByOwner } from '../../../hooks/useTrades';
import Spinner from '../spinner/Spinner';

export default function Profile() {
    const { email, username, userId } = useAuthContext();
    const [trades, setTrades, loading, setLoading] = useGetByOwner(userId);

    return (
        <div className={styles.profileContainer}>
            <h2 className={styles.title}>Profile</h2>
            <div className={styles.profileInfo}>
                <div className={styles.profileDetails}>
                    <div className={styles.profileGroup}>
                        <label htmlFor="username" className={styles.label}>Username:</label>
                        <p id="username" className={styles.value}>{username}</p>
                    </div>
                    <div className={styles.profileGroup}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <p id="email" className={styles.value}>{email}</p>
                    </div>
                </div>
                <div className={styles.tradesSection}>
                    <h3 className={styles.tradesTitle}>Created Trades:</h3>
                    <div className={styles.tradesList}>
                        {loading
                            ? <Spinner />
                            : trades.length > 0
                                ? trades.map(trade => <Card key={trade._id} {...trade} />)
                                : <p className={styles.noTrades}>No recorded trades</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


