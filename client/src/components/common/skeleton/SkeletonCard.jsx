import styles from './Skeleton.module.css';

export default function SkeletonCard() {
  return (
    <div className={`${styles.skeleton} ${styles.card}`}>
      <div className={`${styles.skeleton} ${styles.line} ${styles.md}`}></div>
      <div className={`${styles.skeleton} ${styles.line} ${styles.lg}`}></div>
      <div className={`${styles.skeleton} ${styles.line} ${styles.full}`}></div>
      <div className={`${styles.skeleton} ${styles.line} ${styles.full}`}></div>
      <div className={`${styles.skeleton} ${styles.line} ${styles.sm}`}></div>
    </div>
  );
}

