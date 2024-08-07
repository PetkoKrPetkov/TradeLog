import React from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ title, message, onClose, onConfirm }) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal}>
                <header className={styles.header}>
                    <h2>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </header>
                <main className={styles.content}>
                    {message}
                </main>
                <footer className={styles.footer}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                    <button className={styles.confirmButton} onClick={onConfirm}>Confirm</button>
                </footer>
            </div>
        </div>
    );
}

