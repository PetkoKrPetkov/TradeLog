export function formatNumber(value, { maximumFractionDigits = 2 } = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  try {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(value);
  } catch {
    const num = Number(value);
    return Number.isFinite(num) ? num.toFixed(maximumFractionDigits) : 'N/A';
  }
}

export function formatInteger(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  try {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);
  } catch {
    const num = Number(value);
    return Number.isFinite(num) ? String(Math.trunc(num)) : 'N/A';
  }
}

// Safe formatting for YYYY-MM-DD without timezone shifts
export function formatDateISO(dateStr) {
  if (!dateStr) return '';
  const parts = String(dateStr).split('-');
  if (parts.length !== 3) return String(dateStr);
  const [y, m, d] = parts.map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  try {
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(dt);
  } catch {
    return dt.toLocaleDateString();
  }
}

export function formatMaybeNumber(value, digits = 2) {
  if (value === null || value === undefined || value === '') return 'N/A';
  return formatNumber(value, { maximumFractionDigits: digits });
}

