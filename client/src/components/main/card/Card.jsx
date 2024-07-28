import React from 'react';
import styles from './Card.module.css';

export default function Card(
    {
        _ownerId,
        ticker,
        date,
        entry,
        exit,
        volume,
        support,
        ma,
        price_action,
        oscilators,
        _createdOn,
        _id
    }
) {
    return (
        <div className={styles["flex-item"]}>
            <section className={styles["card-container"]}>
                <header>
                    <h4>{ticker}</h4>
                </header>
                <article>
                    <header>
                        <h5>Date: {date}</h5>
                    </header>
                        <p>Entry price: {entry}</p>
                        <p>Exit price: {exit}</p>
                        <p>Volume: {volume}$</p>
                        {/* <p>Profit/Loss: 100$</p> */}
                </article>
                <article>
                    <header>
                        <h5>Criteria for entry</h5>
                    </header>
                        <p>Support: {support}</p>
                        <p>MA: {ma}</p>
                        <p>Price action: {price_action}</p>
                        <p>Oscilators: {oscilators}</p>
                </article>
                <footer>
                    <p>Comment</p>
                </footer>
            </section>
        </div>
    );
}




