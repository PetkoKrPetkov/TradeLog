import { Router } from 'express';

const router = Router();

// In-memory cache (15 seconds)
const TTL = 15_000;
let cache = { ts: 0, data: null };

const DEFAULT_SYMBOLS = [
  '^GSPC',   // S&P 500
  '^NDX',    // NASDAQ 100
  '^GDAXI',  // DAX 40
  '^HSI',    // Hang Seng Index
  'EURUSD=X',
  'BTC-USD',
  'ETH-USD',
  'SOL-USD',
];

function mapQuote(q) {
  return {
    symbol: q.symbol,
    shortName: q.shortName || q.longName || q.symbol,
    price: q.regularMarketPrice ?? null,
    change: q.regularMarketChange ?? null,
    changePercent: q.regularMarketChangePercent ?? null,
    marketTime: q.regularMarketTime ? q.regularMarketTime * 1000 : null,
    currency: q.currency || null,
  };
}

router.get('/quotes', async (req, res) => {
  try {
    const symbols = (req.query.symbols ? String(req.query.symbols).split(',') : DEFAULT_SYMBOLS).join(',');

    const now = Date.now();
    if (cache.data && now - cache.ts < TTL && !req.query.symbols) {
      return res.json(cache.data);
    }

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36',
      'Accept': 'application/json,text/plain,*/*',
      'Accept-Language': 'en-US,en;q=0.8',
    };
    const response = await fetch(url, { headers });
    let list = [];
    if (response.ok) {
      const json = await response.json();
      list = (json?.quoteResponse?.result || []).map(mapQuote);
    } else {
      // Upstream failed; fall back to placeholders
      list = symbols.split(',').map((s) => ({ symbol: s, shortName: s, price: null, change: 0, changePercent: 0, marketTime: null, currency: null }));
    }

    if (!req.query.symbols) {
      cache = { ts: now, data: list };
    }
    res.json(list);
  } catch (e) {
    console.error('[MARKET]', e);
    const symbols = DEFAULT_SYMBOLS;
    const fallback = symbols.map((s) => ({ symbol: s, shortName: s, price: null, change: 0, changePercent: 0, marketTime: null, currency: null }));
    res.json(fallback);
  }
});

// Intraday sparkline data for a symbol (1d/1m)
router.get('/chart', async (req, res) => {
  try {
    const symbol = String(req.query.symbol || '').trim();
    if (!symbol) return res.status(400).json({ message: 'symbol is required' });

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1m`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36',
      'Accept': 'application/json,text/plain,*/*',
      'Accept-Language': 'en-US,en;q=0.8',
    };
    const response = await fetch(url, { headers });
    if (!response.ok) {
      return res.json({ symbol, series: [] });
    }
    const json = await response.json();
    const result = json?.chart?.result?.[0];
    const ts = result?.timestamp || [];
    const closes = result?.indicators?.quote?.[0]?.close || [];
    const series = [];
    for (let i = 0; i < ts.length; i++) {
      const c = closes[i];
      if (c != null && Number.isFinite(c)) series.push({ t: ts[i] * 1000, c });
    }
    return res.json({
      symbol,
      currency: result?.meta?.currency || null,
      series,
    });
  } catch (e) {
    console.error('[MARKET CHART]', e);
    res.json({ symbol: String(req.query.symbol||'').trim(), series: [] });
  }
});

export default router;
