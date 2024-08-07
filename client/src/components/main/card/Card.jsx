import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({
    _ownerId,
    ticker,
    date,
    trade_direction,
    entry,
    exit,
    volume,
    support,
    ma,
    price_action,
    oscilators,
    _createdOn,
    _id
}) {
    return (
        <div className={styles["flex-item"]}>
            <section className={styles["card-container"]}>
                <header className={styles.header}>
                    <h4>{ticker}</h4>
                </header>
                <article className={styles.article}>
                    <header>
                        <h5>Date: {date}</h5>
                    </header>
                    <p>Trade direction: {trade_direction}</p>
                    <p>Entry price: {entry}</p>
                    <p>Exit price: {exit}</p>
                    <p>Volume: {volume}$</p>
                </article>
                <footer className={styles.footer}>
                    <Link to={`/trades/${_id}/details`} className={styles.detailsLink}>Details</Link>
                </footer>
            </section>
        </div>
    );
}