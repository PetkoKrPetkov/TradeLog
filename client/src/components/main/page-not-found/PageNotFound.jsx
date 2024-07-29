import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css';

export default function PageNotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.errorMessage}>Page Not Found</p>
            <Link to="/" className={styles.homeLink}>Go back to Home</Link>
        </div>
    );
}
