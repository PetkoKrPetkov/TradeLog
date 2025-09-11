import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { formatMaybeNumber, formatInteger, formatDateISO } from '../../../utils/format';

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
    strategy,
    tags,
    _createdOn,
    _id
}) {
    return (
        <div className={styles["flex-item"]}>
            <section className={styles["card-container"]}>
                <header className={styles.header}>
                    <h4>{ticker}</h4>
                    <div>
                        {trade_direction && (
                            <span className={
                                trade_direction === 'long' ? `${styles.badge} ${styles.badgeLong}` :
                                trade_direction === 'short' ? `${styles.badge} ${styles.badgeShort}` :
                                `${styles.badge} ${styles.badgeOther}`
                            }>
                                {trade_direction}
                            </span>
                        )}
                    </div>
                </header>
                <article className={styles.article}>
                    <header>
                        <h5>Date: {formatDateISO(date)}</h5>
                    </header>
                    <p>Trade direction: {trade_direction}</p>
                    <p>Entry price: {formatMaybeNumber(entry)}</p>
                    <p>Exit price: {formatMaybeNumber(exit)}</p>
                    <p>Volume: {formatInteger(volume)}$</p>
                    {strategy ? <p>Strategy: {strategy}</p> : null}
                    {Array.isArray(tags) && tags.length > 0 ? (
                        <p>Tags: {tags.slice(0,3).join(', ')}{tags.length>3?'…':''}</p>
                    ) : null}
                </article>
                <footer className={styles.footer}>
                    <Link to={`/trades/${_id}/details`} className={styles.detailsLink}>Details</Link>
                </footer>
            </section>
        </div>
    );
}
