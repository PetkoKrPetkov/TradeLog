import React, { useEffect, useRef } from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ title, message, onClose, onConfirm }) {
    const modalRef = useRef(null);

    useEffect(() => {
        // Focus modal for keyboard users
        modalRef.current?.focus();
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    const stop = (e) => e.stopPropagation();

    return (
        <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog" aria-labelledby="confirm-title">
            <div className={styles.modal} onClick={stop} tabIndex={-1} ref={modalRef}>
                <header className={styles.header}>
                    <h2 id="confirm-title">{title}</h2>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close dialog">
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

