import { useEffect, useRef } from 'react';

export default function TVTickerTape({ symbols }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const themeEl = document.documentElement;
    const build = () => {
      const theme = themeEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const cfg = {
        symbols: symbols && symbols.length ? symbols : [
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
          { proName: 'FOREXCOM:NSXUSD', title: 'Nasdaq 100' },
          { proName: 'TVC:DAX', title: 'DAX 40' },
          { proName: 'FX:EURUSD', title: 'EUR/USD' },
          { proName: 'COINBASE:BTCUSD', title: 'BTC/USD' },
          { proName: 'COINBASE:ETHUSD', title: 'ETH/USD' },
        ],
        showSymbolLogo: true,
        colorTheme: theme,
        isTransparent: false,
        displayMode: 'adaptive',
        locale: 'en',
      };
      const host = containerRef.current;
      if (!host) return;
      host.innerHTML = '';
      const widget = document.createElement('div');
      widget.className = 'tradingview-widget-container__widget';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
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
  }, [symbols]);

  return <div className="tradingview-widget-container" ref={containerRef} />;
}

