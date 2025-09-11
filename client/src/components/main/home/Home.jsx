import styles from './Home.module.css';
import PageHeader from '../../common/page-header/PageHeader';
import TradingViewOverview from './TradingViewOverview';
import TVAdvancedChart from './TVAdvancedChart';
import TVTickerTape from './TVTickerTape';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showOverview, setShowOverview] = useState(() => localStorage.getItem('home_show_overview') !== 'false');
  useEffect(() => { localStorage.setItem('home_show_overview', String(showOverview)); }, [showOverview]);
  const defaultSymbols = [
    { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
    { s: 'FOREXCOM:NSXUSD', d: 'NASDAQ 100' },
    { s: 'TVC:DAX', d: 'DAX 40' },
    { s: 'TVC:DJI', d: 'Dow Jones' },
    { s: 'FX:EURUSD', d: 'EUR/USD' },
    { s: 'OANDA:XAUUSD', d: 'XAU/USD' },
    { s: 'COINBASE:BTCUSD', d: 'BTC/USD' },
    { s: 'COINBASE:ETHUSD', d: 'ETH/USD' },
  ];
  const [sym, setSym] = useState(() => localStorage.getItem('home_chart_symbol') || defaultSymbols[0].s);
  const onChange = (e) => { setSym(e.target.value); localStorage.setItem('home_chart_symbol', e.target.value); };
  const [showTicker, setShowTicker] = useState(() => localStorage.getItem('home_show_ticker') !== 'false');
  useEffect(() => { localStorage.setItem('home_show_ticker', String(showTicker)); }, [showTicker]);

  return (
    <div>
      <PageHeader title="Home" breadcrumbs={[{ label: 'Home' }]} />
      {showTicker && <TVTickerTape />}
      <div className={styles.toolbar}>
        <h2 className={styles.h2}>Candlestick Chart</h2>
        <select className={styles.select} value={sym} onChange={onChange}>
          {defaultSymbols.map(o => (<option key={o.s} value={o.s}>{o.d}</option>))}
        </select>
      </div>
      <TVAdvancedChart symbol={sym} height={'78vh'} />
      <div className={styles.toolbar}><h2 className={styles.h2}>Market Overview</h2></div>
      <div className={styles.settings}>
        <label className={styles.switch}>
          <input type="checkbox" checked={showOverview} onChange={(e)=> setShowOverview(e.target.checked)} />
          Show Overview
        </label>
        <label className={styles.switch}>
          <input type="checkbox" checked={showTicker} onChange={(e)=> setShowTicker(e.target.checked)} />
          Show Ticker Tape
        </label>
      </div>
      {showOverview && <TradingViewOverview />}
    </div>
  );
}
