import { useEffect, useRef } from 'react';

export default function TradingViewOverview({ tabs }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const themeEl = document.documentElement;
    const build = () => {
      const theme = themeEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const cfg = {
        colorTheme: theme,
        dateRange: '1D',
        showChart: true,
        locale: 'en',
        width: '100%',
        height: 560,
        largeChartUrl: '',
        isTransparent: false,
        showSymbolLogo: true,
        tabs: tabs && tabs.length ? tabs : [
          {
            title: 'Indices',
            symbols: [
              { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
              { s: 'FOREXCOM:NSXUSD', d: 'NASDAQ 100' },
              // DAX: добавяме алтернативен символ, ако DE40 не зарежда
              { s: 'FOREXCOM:DE40EUR', d: 'DAX 40 (CFD)' },
              { s: 'TVC:DAX', d: 'DAX 40' },
              { s: 'TVC:DJI', d: 'Dow Jones' },
              { s: 'TVC:UKX', d: 'FTSE 100' },
              { s: 'TVC:CAC40', d: 'CAC 40' },
              { s: 'TVC:NI225', d: 'Nikkei 225' },
              { s: 'HSI:HSI', d: 'Hang Seng' },
            ],
          },
          {
            title: 'Forex',
            symbols: [
              { s: 'FX:EURUSD', d: 'EUR/USD' },
              { s: 'FX:GBPUSD', d: 'GBP/USD' },
              { s: 'FX:USDJPY', d: 'USD/JPY' },
              { s: 'FX:USDCHF', d: 'USD/CHF' },
              { s: 'FX:AUDUSD', d: 'AUD/USD' },
              { s: 'FX:USDCAD', d: 'USD/CAD' },
              { s: 'OANDA:XAUUSD', d: 'XAU/USD' },
            ],
          },
          {
            title: 'Crypto',
            symbols: [
              { s: 'COINBASE:BTCUSD', d: 'BTC/USD' },
              { s: 'COINBASE:ETHUSD', d: 'ETH/USD' },
              { s: 'BINANCE:SOLUSDT', d: 'SOL/USDT' },
              { s: 'BINANCE:BNBUSDT', d: 'BNB/USDT' },
              { s: 'BINANCE:XRPUSDT', d: 'XRP/USDT' },
              { s: 'BINANCE:ADAUSDT', d: 'ADA/USDT' },
            ],
          },
        ],
      };
      const host = containerRef.current;
      if (!host) return;
      host.innerHTML = '';
      const widget = document.createElement('div');
      widget.className = 'tradingview-widget-container__widget';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify(cfg);
      host.appendChild(widget);
      host.appendChild(script);
    };
    build();
    const observer = new MutationObserver(build);
    observer.observe(themeEl, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { observer.disconnect(); if (containerRef.current) containerRef.current.innerHTML = ''; };
  }, [tabs]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} />
  );
}
