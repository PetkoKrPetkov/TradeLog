import styles from './Skeleton.module.css';

export default function SkeletonDetails() {
  return (
    <div className={styles.details}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className={`${styles.skeleton} ${styles.row}`}></div>
      ))}
    </div>
  );
}

