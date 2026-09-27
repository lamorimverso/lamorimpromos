import test from 'node:test';
import assert from 'node:assert/strict';

import { addRecentLink, normalizeRecentLinks } from '../lib/recent-links.js';

test('normalizeRecentLinks retorna lista vazia para armazenamento corrompido', () => {
  assert.deepEqual(normalizeRecentLinks('não é array'), []);
  assert.deepEqual(normalizeRecentLinks(null), []);
});

test('normalizeRecentLinks remove itens sem finalUrl HTTP(S)', () => {
  const result = normalizeRecentLinks([
    { provider: 'amazon', originalUrl: 'https://amazon.com.br/x', finalUrl: 'javascript:bad', timestamp: 1 },
    { provider: 'shopee', originalUrl: 'https://shopee.com.br/x', finalUrl: 'https://s.shopee.com.br/ok', timestamp: 2 },
  ]);
  assert.equal(result.length, 1);
  assert.equal(result[0].provider, 'shopee');
});

test('addRecentLink coloca o mais novo primeiro, remove duplicado e limita a 10', () => {
  const existing = Array.from({ length: 10 }, (_, index) => ({
    provider: 'amazon',
    originalUrl: `https://amazon.com.br/${index}`,
    finalUrl: `https://amzn.to/${index}`,
    timestamp: index,
  }));
  const next = addRecentLink(existing, {
    provider: 'shopee',
    originalUrl: 'https://shopee.com.br/product/1/2',
    finalUrl: 'https://s.shopee.com.br/NOVO',
    timestamp: 99,
  });
  assert.equal(next.length, 10);
  assert.equal(next[0].finalUrl, 'https://s.shopee.com.br/NOVO');

  const deduped = addRecentLink(next, {
    provider: 'shopee',
    originalUrl: 'https://shopee.com.br/product/1/2',
    finalUrl: 'https://s.shopee.com.br/NOVO',
    timestamp: 100,
  });
  assert.equal(deduped.filter((item) => item.finalUrl === 'https://s.shopee.com.br/NOVO').length, 1);
  assert.equal(deduped[0].timestamp, 100);
});
