import React from 'react';
import styles from './Register.module.css';

export default function Register() {
    return (
        <div className={styles.formContainer}>
        <form className={styles.form}>
            <h2 className={styles.title}>Register</h2>
            <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                />
            </div>
            <button type="submit" className={styles.button}>Register</button>
        </form>
        </div>
    );
}
