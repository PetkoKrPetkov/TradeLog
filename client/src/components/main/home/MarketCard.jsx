import { useEffect, useMemo, useState } from 'react';
import { getChart } from '../../../api/market-api';
import styles from './Home.module.css';

function Sparkline({ data = [] }) {
  const path = useMemo(() => {
    if (!data || data.length < 2) return '';
    const w = 160; const h = 40; const pad = 2;
    const xs = data.map(d => d.t);
    const ys = data.map(d => d.c);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const scaleX = (t) => pad + (w - pad * 2) * (t - minX) / (maxX - minX || 1);
    const scaleY = (c) => h - pad - (h - pad * 2) * (c - minY) / (maxY - minY || 1);
    const pts = data.map(d => `${scaleX(d.t)},${scaleY(d.c)}`).join(' ');
    return pts;
  }, [data]);
  return (
    <svg width="100%" height="40" viewBox="0 0 160 40" preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={path} />
    </svg>
  );
}

export default function MarketCard({ quote }) {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getChart(quote.symbol);
        if (!active) return;
        setSeries(data.series || []);
      } catch { setSeries([]); }
    })();
    return () => { active = false };
  }, [quote.symbol]);

  return (
    <div className={styles.marketCard}>
      <div className={styles.mHeader}>
        <span className={styles.mSymbol}>{quote.symbol}</span>
        <span className={styles.mName}>{quote.shortName}</span>
      </div>
      <div className={styles.mRow}>
        <span className={styles.mPrice}>{quote.price ?? '—'}</span>
        <span className={`${styles.mChange} ${quote.change>=0?styles.mUp:styles.mDown}`}>
          {quote.change?.toFixed ? quote.change.toFixed(2) : quote.change} ({quote.changePercent?.toFixed ? quote.changePercent.toFixed(2) : quote.changePercent}%)
        </span>
      </div>
      <div className={styles.spark}>
        <Sparkline data={series} />
      </div>
    </div>
  );
}

