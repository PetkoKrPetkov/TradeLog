import { useEffect, useRef } from 'react';

export default function TVAdvancedChart({ symbol = 'FOREXCOM:SPXUSD', height = 610 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const themeEl = document.documentElement;

    const build = () => {
      const theme = themeEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const cfg = {
        autosize: true,
        symbol,
        interval: '60',
        timezone: 'Etc/UTC',
        theme,
        style: '1', // 1 = Candlesticks
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        studies: [ ],
      };
      const host = containerRef.current;
      if (!host) return;
      host.innerHTML = '';
      const widget = document.createElement('div');
      widget.className = 'tradingview-widget-container__widget';
      // Allow both number (px) and string values (e.g., '75vh')
      widget.style.height = typeof height === 'number' ? `${height}px` : String(height);
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
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
  }, [symbol, height]);

  return <div className="tradingview-widget-container" ref={containerRef} />;
}
