import React from 'react';
import styles from './CreateTrade.module.css';

export default function CreateTrade() {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <h2 className={styles.title}>Create Trade</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="tradeType">Trade Type</label>
                    <input
                        type="text"
                        id="tradeType"
                        name="tradeType"
                        placeholder="Long EUR/USD"
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
                    <label htmlFor="entryPrice">Entry Price</label>
                    <input
                        type="number"
                        id="entryPrice"
                        name="entryPrice"
                        step="0.01"
                        placeholder="1.10"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="exitPrice">Exit Price</label>
                    <input
                        type="number"
                        id="exitPrice"
                        name="exitPrice"
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
                    <label htmlFor="profitLoss">Profit/Loss</label>
                    <input
                        type="number"
                        id="profitLoss"
                        name="profitLoss"
                        placeholder="100"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="criteria">Criteria for entry</label>
                    <textarea
                        id="criteria"
                        name="criteria"
                        rows="4"
                        placeholder="Support, MA, Price action, Oscilators"
                        required
                    ></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        placeholder="Any additional comments"
                        required
                    ></textarea>
                </div>
                <button type="submit" className={styles.button}>Create Trade</button>
            </form>
        </div>
    );
}
