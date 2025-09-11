import { Link } from 'react-router-dom';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, breadcrumbs = [], actions = null }) {
  return (
    <div className={styles.wrap}>
      <div>
        {breadcrumbs?.length > 0 && (
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            {breadcrumbs.map((b, idx) => (
              <span key={idx}>
                {b.to ? (
                  <Link to={b.to} className={styles.crumbLink}>{b.label}</Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && <span className={styles.sep}>/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
      {actions ? <div className={styles.right}>{actions}</div> : null}
    </div>
  );
}

