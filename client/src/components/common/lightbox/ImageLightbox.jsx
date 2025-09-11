import { useEffect, useRef } from 'react';
import styles from './ImageLightbox.module.css';

export default function ImageLightbox({ src, alt = 'Image', onClose }) {
  const contentRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    contentRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  if (!src) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className={styles.content} onClick={stop} tabIndex={-1} ref={contentRef}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        <img className={styles.img} src={src} alt={alt} />
      </div>
    </div>
  );
}

