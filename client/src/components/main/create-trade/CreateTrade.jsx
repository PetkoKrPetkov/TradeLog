import React from 'react';
import styles from './CreateTrade.module.css';
import { useForm } from '../../../hooks/useForm';

const initialValues = {
    ticker: '',
    date: '',
    trade_direction: '',
    entry: '',
    exit: '',
    volume: '',
    support: '',
    ma: '',
    price_action: '',
    oscilators: '',
}

export default function CreateTrade() {
    const createHandler = (values) => {
        console.log(values);

    }

    const {
        values,
        changeHandler,
        submitHandler,
     } = useForm(initialValues, createHandler);
    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={submitHandler}>
                <h2 className={styles.title}>Create Trade</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="ticker">Ticker</label>
                    <input
                        type="text"
                        id="ticker"
                        name="ticker"
                        value={values.ticker}
                        onChange={changeHandler}
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
                        value={values.date}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="trade_direction">Trade Direction</label>
                    <input
                        type="text"
                        id="trade_direction"
                        name="trade_direction"
                        value={values.trade_direction}
                        onChange={changeHandler}
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
                        value={values.entry}
                        onChange={changeHandler}
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
                        value={values.exit}
                        onChange={changeHandler}
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
                        value={values.volume}
                        onChange={changeHandler}
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
                        value={values.support}
                        onChange={changeHandler}
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
                        value={values.ma}
                        onChange={changeHandler}
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
                        value={values.price_action}
                        onChange={changeHandler}
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
                        value={values.oscilators}
                        onChange={changeHandler}
                        placeholder="oscilators"
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Create Trade</button>
            </form>
        </div>
    );
}
