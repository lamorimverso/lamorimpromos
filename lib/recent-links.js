const MAX_RECENT = 10;

function isHttpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
  const finalUrl = typeof item.finalUrl === 'string' ? item.finalUrl.trim() : '';
  if (!isHttpUrl(finalUrl)) return null;
  const originalUrl = typeof item.originalUrl === 'string' && isHttpUrl(item.originalUrl) ? item.originalUrl.trim() : '';
  const provider = typeof item.provider === 'string' ? item.provider.trim().slice(0, 40) : '';
  const timestamp = Number.isFinite(Number(item.timestamp)) ? Number(item.timestamp) : Date.now();
  return { provider, originalUrl, finalUrl, timestamp };
}

export function normalizeRecentLinks(value) {
  if (!Array.isArray(value)) return [];
  const normalized = [];
  for (const item of value) {
    const clean = normalizeItem(item);
    if (!clean) continue;
    if (normalized.some((entry) => entry.finalUrl === clean.finalUrl)) continue;
    normalized.push(clean);
    if (normalized.length >= MAX_RECENT) break;
  }
  return normalized;
}

export function addRecentLink(list, item) {
  const clean = normalizeItem(item);
  if (!clean) return normalizeRecentLinks(list);
  const current = normalizeRecentLinks(list).filter((entry) => entry.finalUrl !== clean.finalUrl);
  return [clean, ...current].slice(0, MAX_RECENT);
}
