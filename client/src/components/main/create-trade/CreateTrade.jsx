import React from 'react';
import styles from './CreateTrade.module.css';

export default function CreateTrade() {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <h2 className={styles.title}>Create Trade</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="ticker">Ticker</label>
                    <input
                        type="text"
                        id="ticker"
                        name="ticker"
                        placeholder="EUR/USD"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="trade_direction">Trade Direction</label>
                    <input
                        type="text"
                        id="trade_direction"
                        name="trade_direction"
                        placeholder="trade_direction"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="entry">Entry Price</label>
                    <input
                        type="number"
                        id="entry"
                        name="entry"
                        step="0.01"
                        placeholder="1.10"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="exit">Exit Price</label>
                    <input
                        type="number"
                        id="exit"
                        name="exit"
                        step="0.01"
                        placeholder="1.11"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="volume">Volume</label>
                    <input
                        type="number"
                        id="volume"
                        name="volume"
                        placeholder="5000"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="support">Support</label>
                    <input
                        type="text"
                        id="support"
                        name="support"
                        placeholder="Trend/Support lines, etc"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ma">Moving Averages</label>
                    <input
                        type="text"
                        id="ma"
                        name="ma"
                        placeholder="50MA, 200MA, etc"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price_action">Price action</label>
                    <input
                        type="text"
                        id="price_action"
                        name="price_action"
                        placeholder="Japanese candlestick patterns"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="oscilators">Oscilators</label>
                    <input
                        type="text"
                        id="oscilators"
                        name="oscilators"
                        placeholder="oscilators"
                        required
                    />
                </div>


                <button type="submit" className={styles.button}>Create Trade</button>
            </form>
        </div>
    );
}
