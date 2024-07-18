import React from 'react';
import styles from './Card.module.css';

export default function Card() {
    return (
        <div className={styles["flex-item"]}>
            <section className={styles["card-container"]}>
                <header>
                    <h4>Long EUR/USD</h4>
                </header>
                <article>
                    <header>
                        <h5>Date: 14.07.2024</h5>
                    </header>
                        <p>Entry price: 1.10</p>
                        <p>Exit price: 1.11</p>
                        <p>Volume: 5 000$</p>
                        <p>Profit/Loss: 100$</p>
                </article>
                <article>
                    <header>
                        <h5>Criteria for entry</h5>
                    </header>
                        <p>Support</p>
                        <p>MA</p>
                        <p>Price action</p>
                        <p>Oscilators</p>
                </article>
                <footer>
                    <p>Comment</p>
                </footer>
            </section>
        </div>
    );
}




