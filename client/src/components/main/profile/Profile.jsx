import React from 'react';
import styles from './Profile.module.css';
import Card from '../card/Card';

export default function Profile() {
    return (
        <div className={styles.profileContainer}>
            <h2 className={styles.title}>Profile</h2>
            <div className={styles.profileInfo}>
                <div className={styles.profileGroup}>
                    <label htmlFor="username" className={styles.label}>Username:</label>
                    <p id="username" className={styles.value}>john_doe</p>
                </div>
                <div className={styles.profileGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <p id="email" className={styles.value}>john_doe@example.com</p>
                </div>
                <div className={styles.profileGroup}>
                    <label htmlFor="trades" className={styles.label}>Created Trades:</label>
                    <ul id="trades" className={styles.tradesList}>
                        <Card></Card>
                        <Card></Card> 
                    </ul>
                </div>
            </div>
        </div>
    );
}
